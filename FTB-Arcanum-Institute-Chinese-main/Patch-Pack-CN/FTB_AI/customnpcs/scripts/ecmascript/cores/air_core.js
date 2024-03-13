//Check the end of the rangedLaunched function to customize the beam with more detail

var BeamDamageRange = 1
var BeamDamage = 5
var BeamSpeed = 60 //Lower is faster, 0 is instant
var AbilityAttemptTime = 10
var Abilities = [Lightning]

function rangedLaunched(t) {
    //despawn normal projectile
    var p = t.projectiles[0]      
    p.despawn()
    var target = t.npc.getAttackTarget()
    if (target == null) return;
    //Make the beam go PAST the player's location
    var d = FrontVectors(t.npc, GetPlayerRotation(t.npc, target), GetPlayerPitch(t.npc, target), 8, 0)
    var BeamEndX = target.x + d[0]
    var BeamEndY = target.y + d[1] + 1
    var BeamEndZ = target.z + d[2]
    //SPECIFICS OF THE BEAM HERE
    MakeParticleDamageLine(t.npc, t.npc.x, t.npc.y + 1, t.npc.z, BeamEndX, BeamEndY, BeamEndZ, 2, BeamSpeed, "cofh_core:spark", 2, 0, 0, 0, 0.02)
}

function MakeParticleDamageLine(entity, x1, y1, z1, x2, y2, z2, resolution, speed, particle, count, dx, dy, dz, dv) {
    var Thread = Java.type("java.lang.Thread"); var HankThread = Java.extend(Thread, {
        run: function () {
            var DX = (x2 - x1);
            var DY = (y2 - y1);
            var DZ = (z2 - z1);
            var ParticleAmount = Math.round(Math.pow(DX * DX + DY * DY + DZ * DZ, 0.5) * resolution)
            for (var i = 0; i < ParticleAmount; ++i) {
                var x = (x1 + DX * i / ParticleAmount).toFixed(4)
                var y = (y1 + DY * i / ParticleAmount).toFixed(4)
                var z = (z1 + DZ * i / ParticleAmount).toFixed(4)
                entity.world.spawnParticle(particle, x, y, z, dx, dy, dz, dv, count)
                //Deal damage at the point where partices are being spawned
                var targs = entity.world.getNearbyEntities(x, y, z, BeamDamageRange + 1, 5)
                for (var j = 0; j < targs.length; ++j) {
                    if (targs[j] != entity && TrueDistanceCoord(x, y, z, targs[j].x, targs[j].y + 1, targs[j].z) <= BeamDamageRange) {
                        targs[j].damage(BeamDamage)
                    }
                }
                Thread.sleep(speed)
            }
        }
    }); var H = new HankThread(); H.start();
}

function Lightning(npc) {
    if (!npc.isAttacking()) return;
    var Thread = Java.type("java.lang.Thread");
    var HankThread = Java.extend(Thread, {
        run: function () {
            var ExtraDamage = 3 //Additional damage dealt by the lightning
            var distAway = 3 //The distance away from the target the lightning can spawn
            var Delay = 40 //Ticks before causing the lightning strike after telegraph appears
            //Get Position and start telegraph
            var targ = npc.getAttackTarget()
            var Spot = targ.getPos().add(Math.round(Math.random() * distAway * 2) - distAway, 0, Math.round(Math.random() * distAway * 2) - distAway)
            npc.swingMainhand()
            npc.swingOffhand()
            npc.world.spawnParticle("cofh_core:spark", npc.x, npc.y + 1, npc.z, 0.2, 0.2, 0.2, 0.2, 55)
            npc.world.spawnParticle("smoke", npc.x, npc.y + 1, npc.z, 0.2, 0.2, 0.2, 0.2, 55)
            npc.world.playSoundAt(Spot, "minecraft:entity.blaze.shoot", 1, 1.4)
            for (var i = 0; i < Delay; ++i) {
                if (i % 10 == 0) npc.world.spawnParticle("cofh_core:spark", Spot.getX(), Spot.getY() + 0.3, Spot.getZ(), 0, 0, 0, 0.1, 10)
                Thread.sleep(50)
            }
            //The Lightning Strike
            npc.world.thunderStrike(Spot.getX(), Spot.getY(), Spot.getZ())
            var targs = npc.world.getNearbyEntities(Spot, 2, 5)
            for (var t = 0; t < targs.length; ++t) {
                if (targs[t] != npc) {
                    targs[t].damage(ExtraDamage)
                }
            }
        }
    });
    var H = new HankThread();
    H.start();
}


function init(t) {
    t.npc.timers.forceStart(1, AbilityAttemptTime * 20, true)
}

function timer(t) {
    if (t.id == 1) {
        if (t.npc.isAttacking()) {
            var randomRoll = Math.floor(Math.random() * Abilities.length)
            Abilities[randomRoll](t.npc) 
        }
    }
}





function TrueDistanceCoord(x1, y1, z1, x2, y2, z2) {
    var dx = x1 - x2
    var dy = y1 - y2
    var dz = z1 - z2
    var R = Math.pow((dx * dx + dy * dy + dz * dz), 0.5)
    return R;
}

function GetPlayerRotation(npc, player) {
    var dx = npc.getX() - player.getX();
    var dz = player.getZ() - npc.getZ();
    if (dz >= 0) {
        var angle = (Math.atan(dx / dz) * 180 / Math.PI);
        if (angle < 0) {
            angle = 360 + angle;
        }
    }
    if (dz < 0) {
        dz = -dz;
        var angle = 180 - (Math.atan(dx / dz) * 180 / Math.PI);
    }
    return angle;
}

function GetPlayerPitch(npc, player) {
    var distance = Math.sqrt(Math.pow((npc.x - player.x), 2) + Math.pow((npc.z - player.z), 2))
    var dy = player.y - npc.y
    var pitch = Math.atan(dy / distance) * 180 / Math.PI
    return pitch
}

function FrontVectors(entity, dr, dp, distance, mode) {
    if (!mode) mode = 0
    if (mode == 1) { var angle = dr + entity.getRotation(); var pitch = (-entity.getPitch() + dp) * Math.PI / 180; if (dp == 0) pitch = 0; }
    if (mode == 0) { var angle = dr; var pitch = (dp) * Math.PI / 180 }
    var dx = -Math.sin(angle * Math.PI / 180) * (distance * Math.cos(pitch))
    var dy = Math.sin(pitch) * distance
    var dz = Math.cos(angle * Math.PI / 180) * (distance * Math.cos(pitch))
    return [dx, dy, dz]
}

function damaged(t) {
    
    if (t.damageSource.getType() == "lightningBolt") t.setCanceled(true)
    if (t.damageSource.isProjectile() && t.source) {
        if (!t.npc.isAttacking()) t.npc.setAttackTarget(t.source)
        t.npc.world.playSoundAt(t.npc.getPos(), "minecraft:entity.blaze.shoot", 5, 1)
        t.npc.world.spawnParticle("large_smoke", t.npc.x, t.npc.y + 1, t.npc.z, 0.3, 0.5, 0.3, 0, 25)
        var TrueSource = t.damageSource.getImmediateSource()
        t.setCanceled(true)
        var nbt = TrueSource.getEntityNbt()
        var x = nbt.getList("Motion", 6)[0]
        var y = nbt.getList("Motion", 6)[1]
        var z = nbt.getList("Motion", 6)[2]
        var Speed = Math.sqrt(x * x + y * y + z * z)
        var d = FrontVectors(t.npc, GetPlayerRotation(t.npc, t.source), GetPlayerPitch(t.npc, t.source), Speed / 2, 0)
        nbt.setList("Motion", [d[0], d[1], d[2]])
        var newProj = t.npc.world.createEntityFromNBT(nbt)
        newProj.generateNewUUID()
        t.npc.world.spawnEntity(newProj)
        TrueSource.despawn()
    }
}
//end