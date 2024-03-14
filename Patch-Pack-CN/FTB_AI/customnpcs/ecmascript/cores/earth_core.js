var Thread = Java.type("java.lang.Thread");

var AbilityAttemptTime = 5 //seconds

var CircleAttackOptions = {
    Intensity: 0.2,
    MaxRange: 5,
    DistanceScalar: 0.1,
    Speed: 5,
    Particle: "supplementaries:green_flame"
}
var RazorLeafOptions = {
    LeafDamage: 2,
    Item: ["hexerei:mugwort_leaves","hexerei:yellow_dock_leaves"],
    Particle: "minecraft:large_smoke"

}
var FangsOptions = {
    Distance: 20,
    Particle: "minecraft:cloud"
}




// MAIN FUCTIONS
function init(t) {
    t.npc.timers.forceStart(2, AbilityAttemptTime * 20, true)
}

function timer(t) {
    if (t.id == 2) {
        if (t.npc.isAttacking()) {
            var randomAttackIndex = Math.floor(Math.random() * Object.keys(attacks).length + 1)
            attacks[randomAttackIndex](t, t.npc) 
        }
    }
}


// HELPER FUNCTIONS
function FrontVectors(entity, dr, dp, distance, mode) {
    if (!mode) mode = 0
    if (mode == 1) { var angle = dr + entity.getRotation(); var pitch = (-entity.getPitch() + dp) * Math.PI / 180 }
    if (mode == 0) { var angle = dr; var pitch = (dp) * Math.PI / 180 }
    var dx = -Math.sin(angle * Math.PI / 180) * (distance * Math.cos(pitch))
    var dy = Math.sin(pitch) * distance
    var dz = Math.cos(angle * Math.PI / 180) * (distance * Math.cos(pitch))
    return [dx, dy, dz]
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

var attacks = {
    1: function Fangs(event, npc) {
        var Distance = 15
        var Particle = "minecraft:cloud"
        //var Thread = Java.type("java.lang.Thread");
        var myThread = Java.extend(Thread, {
            run: function () {
                var targ = npc.getAttackTarget()
                if (targ == null) {
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                    return};
                npc.ai.setWalkingSpeed(0)
                npc.world.spawnParticle(Particle, npc.x, npc.y + 1, npc.z, 1, 1, 1, 0.5, 30)
                for (var i = 0; i < Distance; ++i) {
                    var d = FrontVectors(npc, GetPlayerRotation(npc, targ), 0, 2 + i, 0)
                    var x = npc.x + d[0]
                    var y = npc.y-1
                    var z = npc.z + d[2]
                    npc.world.spawnParticle("soul", x, y+0.5, z, 0.5, 0.5, 0.5, 0, 10)
                    Thread.sleep(200)
                    event.API.executeCommand(npc.world, "/summon minecraft:evoker_fangs " + x + " " + y + " " + z)

                }
                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
            }
        });
        var T = new myThread();
        T.start();
    },
    2: function CircleAttack(event, npc) {
        var Intensity = CircleAttackOptions.Intensity
        var MaxRange = Math.floor(Math.random() * 5 + 5)
        var DistanceScalar = CircleAttackOptions.DistanceScalar
        var Speed = CircleAttackOptions.Speed
        var Particle = CircleAttackOptions.Particle

        var Thread = Java.type("java.lang.Thread");
        var HankThread = Java.extend(Thread, {
            run: function () {
                npc.world.playSoundAt(npc.getPos(), "minecraft:entity.blaze.shoot", 1, 1)
                var vics = npc.world.getNearbyEntities(npc.x, npc.y, npc.z, MaxRange, 5)
                for (var j = 0; j < vics.length; ++j) {
                    if (vics[j] != npc) {
                        var dist = npc.getPos().distanceTo(vics[j].getPos())
                        var Str = Intensity + DistanceScalar * dist
                        var d = FrontVectors(npc, GetPlayerRotation(npc, vics[j]), 0, Intensity, 0)
                        vics[j].setMotionX(d[0])
                        vics[j].setMotionY(1.5)
                        vics[j].setMotionZ(d[2])
                    }
                }
                if (Intensity > 0) {
                    for (var k = 0; k < MaxRange * 2; ++k) {
                        for (var i = 0; i < 72; ++i) {
                            var d = FrontVectors(npc, i * 5, 0, k / 2 * (Intensity / Math.abs(Intensity)), 0)
                            npc.world.spawnParticle(Particle, npc.x + d[0], npc.y-0.9, npc.z + d[2], 0.3, 0.1, 0.3, 0, 3)
                        }
                        Thread.sleep(Speed)
                    }
                }
                else {
                    for (var k = MaxRange * 2; k > 0; --k) {
                        for (var i = 0; i < 72; ++i) {
                            var d = FrontVectors(npc, i * 5, 0, k / 2 * (Intensity / Math.abs(Intensity)), 0)
                            npc.world.spawnParticle(Particle, npc.x + d[0], npc.y, npc.z + d[2], 0, 0, 0, 0, 1)
                        }
                        Thread.sleep(Speed)
                    }
                }
            }
        }); var H = new HankThread(); H.start();
    },
    3: function RazorLeaf(event, npc) {
        var LeafDamage = 2.0
        var Thread = Java.type("java.lang.Thread");
        var MyThread = Java.extend(Thread, {
            run: function () {
                var d = FrontVectors(npc, 0, 0, 1, 1)
                var f = FrontVectors(npc, -90, 0, 0.75, 1)
                var targ = npc.world.getClosestEntity(npc.getPos(), 20, 1)
                if (targ == null) {
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                    return};
                var Ps = []
                for (var i = -2; i <= 2; ++i) {
                    for (var j = 1; j <= 5; ++j) {
                        if ((i == 2 || i == -2) && (j == 1 || j == 5)) continue;
                        var P = npc.world.createEntity('customnpcs:customnpcprojectile')
                        var Item = npc.world.createItem('minecraft:green_dye', 1)
                        Item.setCustomName("Leaf")
                        P.setItem(Item)
                        P.setPosition(npc.x + d[0] + i * f[0], npc.y + j * 0.5, npc.z + d[2] + i * f[2])
                        npc.world.spawnEntity(P)
                        npc.world.spawnParticle("large_smoke", npc.x + d[0] + i * f[0], npc.y + j * 0.5, npc.z + d[2] + i * f[2], 0, 0, 0, 0, 1)
                        var n = P.getEntityNbt()
                        n.setFloat("damagev2", LeafDamage)
                        P.setEntityNbt(n)
                        Ps.push(P)
                    }
                }
                npc.world.playSoundAt(npc.getPos(), "minecraft:block.grass.place", 5, 0.7)
                Thread.sleep(800)
                var Total = Ps.length
                for (var i = 0; i < Total; ++i) {
                    var index = parseInt(Math.random() * Ps.length)
                    // npc.world.playSoundAt(npc.getPos(), "dsurround:tool.swing", 5, 1.2)
                    Ps[index].setHeading(targ.x + Math.random(), targ.y + 1 + Math.random() * 0.25, targ.z + Math.random())
                    Thread.sleep(200)
                    Ps.splice(index, 1)

                }
                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
            }
        });
        var H = new MyThread();
        H.start();
    },
    4: function FangSlash(event, npc) {
        var linesBefore = 5
        var linesAfter = 2
        var Resolution = 10
        var Speed = 1
        var Particle = "soul_fire_flame"
        var Particle2 = "soul"
        var Count = 1
        var dx = 0.5
        var dy = 0
        var dz = 0.5
        var dv = 0
        var Dmg = 0
        var Range = 0
        var Sound = ""
        var ID = 0
        var linesL = []
        var targ = npc.getAttackTarget()
        if (targ == null) {
            var storedData = npc.getStoreddata()
            storedData.put("attacking", "false")
            return};

        var myThread = Java.extend(Thread, {
            run: function () {
                for(var i = 0; i < linesBefore+linesAfter; i++){

                    var lerp_x = Math.floor(lerp(npc.x, targ.x, i/linesBefore))
                    var lerp_y = Math.floor(lerp(npc.y+1, targ.y+1, i/linesBefore))
                    var lerp_z = Math.floor(lerp(npc.z, targ.z, i/linesBefore))

                    var x1 = lerp_x + (getRandomInt(2, 4) * Math.round(Math.random()) * 2 - 1)
                    var x2 = lerp_x + (getRandomInt(2, 4) * Math.round(Math.random()) * 2 - 1)
                    var z1 = lerp_z + (getRandomInt(2, 4) * Math.round(Math.random()) * 2 - 1)
                    var z2 = lerp_z + (getRandomInt(2, 4) * Math.round(Math.random()) * 2 - 1)
                    linesL.push({x1:x1, x2:x2, z1:z1, z2:z2})
                }

                for(var i = 0; i < linesL.length; i++){
                    var flip = Math.floor(Math.random() * 100)
                    if(flip > 50){
                        ParticleLine(npc, linesL[i].x2, npc.y-1.9, linesL[i].z2, linesL[i].x1, npc.y-0.9, linesL[i].z1, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                    }else {
                        ParticleLine(npc, linesL[i].x1, npc.y-1.9, linesL[i].z1, linesL[i].x2, npc.y-0.9, linesL[i].z2, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                    }
                    Thread.sleep(75)
                }
                Thread.sleep(250)


                for(var i = 0; i < linesL.length; i++){
                    var flip = Math.floor(Math.random() * 100)
                    if(flip > 50){
                        for(var j = 0; j < 5; j++){
                            var x = lerp(linesL[i].x2, linesL[i].x1, j/5)
                            var y = npc.y-1
                            var z = lerp(linesL[i].z2, linesL[i].z1, j/5)
                            npc.world.spawnParticle(Particle2, x, npc.y-0.9, z, 0.2, 0.2, 0.2, 0.2, 5)
                            Thread.sleep(50)
                            event.API.executeCommand(npc.world, "/summon minecraft:evoker_fangs " + x + " " + y + " " + z)
                            Thread.sleep(5)
                        } 

                    }else {
                        for(var j = 0; j < 5; j++){
                            var x = lerp(linesL[i].x1, linesL[i].x2, j/5)
                            var z = lerp(linesL[i].z1, linesL[i].z2, j/5)
                            npc.world.spawnParticle(Particle2, x, npc.y, z, 0.2, 0.2, 0.2, 0.2, 5)
                            Thread.sleep(50)
                            event.API.executeCommand(npc.world, "/summon minecraft:evoker_fangs " + x + " " + npc.y + " " + z)
                            Thread.sleep(5)
                        }
                    }
                    
                }
                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
        }
        }); var T = new myThread(); T.start();
    }
}


function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}



function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
function TrueDistanceCoord(x1, y1, z1, x2, y2, z2) {
    var dx = x1 - x2
    var dy = y1 - y2
    var dz = z1 - z2
    var R = Math.pow((dx * dx + dy * dy + dz * dz), 0.5)
    return R;
}