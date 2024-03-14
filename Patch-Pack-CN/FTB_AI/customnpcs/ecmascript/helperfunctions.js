var Thread = Java.type("java.lang.Thread");

function ParticleLine(entity, x1, y1, z1, x2, y2, z2, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID) {
    var NpcAPI = Java.type("noppes.npcs.api.NpcAPI").Instance();
    //var Thread = Java.type("java.lang.Thread");
    var MyThread = Java.extend(Thread, {
        run: function () {
            if (!dx) { dx = 0; } if (!dy) { dy = 0; } if (!dz) { dz = 0; } if (!dv) { dv = 0; } if (!Sound) { Sound = ""; }
            if (!ID) { ID = 0; } if (!Dmg) { Dmg = 0; } if (!Range) { Range = 0; }
            var Blockable = false
            if (Range < 0) { Blockable = true; Range = Range * -1 }
            var ParticleTotal = Math.round(TrueDistanceCoord(x1, y1, z1, x2, y2, z2) * Resolution)
            for (var i = 0; i < ParticleTotal; i++) {
                var x = (x1 + (x2 - x1) * (i / ParticleTotal)).toFixed(4);
                var y = (y1 + 1 + (y2 - y1) * (i / ParticleTotal)).toFixed(4);
                var z = (z1 + (z2 - z1) * (i / ParticleTotal)).toFixed(4);
                //NpcAPI.executeCommand(entity.world,"/particle "+Particle+" "+x+ " "+y+" "+z+" "+dx+" "+dy+" "+dz+" "+dv+" "+Count);
                entity.world.spawnParticle(Particle, x, y, z, dx, dy, dz, dv, Count)
                var CurrentPos = entity.world.getBlock(x, y, z).getPos()
                if (ID <= 0 && !entity.world.getBlock(x, y, z).isAir()) return;
                entity.world.playSoundAt(CurrentPos, Sound, 1, 1)
                if (Dmg != 0 || ID != 0) {
                    var targs = entity.world.getNearbyEntities(CurrentPos, Math.ceil(Range), 5)
                    for (var t = 0; t < targs.length; ++t) {
                        if (targs[t] != entity) {
                            if (TrueDistanceCoord(x, y, z, targs[t].getX(), targs[t].getY() + 1, targs[t].getZ()) > Range) continue;
                            //Extra Damage Effects Here
                            if (parseInt(Math.abs(ID)) == 1) targs[t].addPotionEffect(Math.round((Math.abs(ID.toFixed(2)) - 1) * 100), Math.abs(Math.round((ID - ID.toFixed(2)) * 10000)), Math.abs(Math.round((ID - ID.toFixed(4)) * 1000000)), false)
                            targs[t].damage(Dmg)
                        }
                    }
                }
                Thread.sleep(Speed);
            }
        }
    });
    var th = new MyThread();
    th.start();
}

function GetPlayerPitch(npc, player) {
    var distance = Math.sqrt(Math.pow((npc.x - player.x), 2) + Math.pow((npc.z - player.z), 2))
    var dy = player.y - npc.y
    var pitch = Math.atan(dy / distance) * 180 / Math.PI
    return pitch
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

function FrontVectors(entity, dr, dp, distance, mode) {
    if (!mode) mode = 0
    if (mode == 1) { var angle = dr + entity.getRotation(); var pitch = (-entity.getPitch() + dp) * Math.PI / 180 }
    if (mode == 0) { var angle = dr; var pitch = (dp) * Math.PI / 180 }
    var dx = -Math.sin(angle * Math.PI / 180) * (distance * Math.cos(pitch))
    var dy = Math.sin(pitch) * distance
    var dz = Math.cos(angle * Math.PI / 180) * (distance * Math.cos(pitch))
    return [dx, dy, dz]
}

function TrueDistanceCoord(x1, y1, z1, x2, y2, z2) {
    var dx = x1 - x2
    var dy = y1 - y2
    var dz = z1 - z2
    var R = Math.pow((dx * dx + dy * dy + dz * dz), 0.5)
    return R;
}

function pushBack(npc, player, Intensity, DistanceScalar, Height){
    var dist = npc.getPos().distanceTo(player.getPos())
    var Str = Intensity + DistanceScalar * dist
    var d = FrontVectors(npc, GetPlayerRotation(npc, player), 0, Intensity, 0)
    player.setMotionX(d[0])
    player.setMotionY(0.2)
    player.setMotionZ(d[2])
}
function pushVertical(npc, player, Intensity, DistanceScalar, Height){
    var dist = npc.getPos().distanceTo(player.getPos())
    var Str = Intensity + DistanceScalar * dist
    var d = FrontVectors(npc, GetPlayerRotation(npc, player), 0, Intensity, 0)
    player.setMotionX(0)
    player.setMotionY(1.5)
    player.setMotionZ(0)
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function handle360Limits(rot) {
    if (rot < 0) {
        return 360 + rot;
    } else if (rot > 360) {
        return rot - 360;
    } else {
        return rot;
    }
}





function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
