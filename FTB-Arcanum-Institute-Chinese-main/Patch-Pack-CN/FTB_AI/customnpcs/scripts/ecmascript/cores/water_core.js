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
    1: function WaterBoomLine(event, npc) {
        var BreakBlocks = false;
        var Range = 2;
        var Damage = 5;
        var Sound = "" //Plays an extra sound along with the explosion
        var Speed = 75 // How quickly the beam moves. Lower is faster
        var Resolution = 1 //How many "explosions / block"
        var ExtendDistance = 5 //How far past the player the explosions will continue

        var Thread = Java.type("java.lang.Thread");
        var myThread = Java.extend(Thread, {
            run: function () {
                var targ = npc.getAttackTarget()
                if (targ == null) {
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                    return};
                var d = FrontVectors(npc, GetPlayerRotation(npc, targ), GetPlayerPitch(npc, targ), ExtendDistance, 0)
                var x1 = npc.x; var y1 = npc.y; var z1 = npc.z;
                var x2 = targ.x + d[0]; var y2 = targ.y + 0.5 + d[1]; var z2 = targ.z + d[2];
                var ParticleTotal = Math.round(TrueDistanceCoord(x1, y1, z1, x2, y2, z2) * Resolution)
                for (var i = 0; i < ParticleTotal; i++) {
                    var x = (x1 + (x2 - x1) * (i / ParticleTotal)).toFixed(4);
                    var y = (y1 + 1 + (y2 - y1) * (i / ParticleTotal)).toFixed(4);
                    var z = (z1 + (z2 - z1) * (i / ParticleTotal)).toFixed(4);
                    npc.world.spawnParticle("end_rod", x, y, z, 0, 0, 0, 0, 1)
                    var CurrentPos = npc.world.getBlock(x, y, z).getPos()
                    npc.world.playSoundAt(CurrentPos, Sound, 1, 1)
                    if (!npc.world.getBlock(x, y, z).isAir()) break;
                }
                for (var i = 0; i < ParticleTotal; i++) {
                    var x = (x1 + (x2 - x1) * (i / ParticleTotal)).toFixed(4);
                    var y = (y1 + 1 + (y2 - y1) * (i / ParticleTotal)).toFixed(4);
                    var z = (z1 + (z2 - z1) * (i / ParticleTotal)).toFixed(4);
                    var CurrentPos = npc.world.getBlock(x, y, z).getPos()
                    npc.world.playSoundAt(CurrentPos, Sound, 1, 1)
                    if (BreakBlocks) {
                        npc.world.explode(x, y, z, Range, false, true)
                    }
                    else {
                        npc.world.spawnParticle("cofh_core:frost", x, y, z, 0.5, 0.5, 0.5, 0, 10)
                        npc.world.playSoundAt(CurrentPos, "minecraft:entity.generic.explode", 1, 1)
                    }
                    var targs = npc.world.getNearbyEntities(CurrentPos, Range, 5)
                    for (var t = 0; t < targs.length; ++t) {
                        if (targs[t] != npc) {
                            targs[t].damage(Damage)
                            pushBack(npc, targs[t], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.4)
                        }
                    }
                    Thread.sleep(Speed)
                    npc.world.spawnParticle("cofh_core:frost", x, y, z, 0.3, 0.3, 0.3, 0, 15)

                }
                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
            }
        }); var T = new myThread(); T.start();
    },
    2: function IceBreath(event, npc) {
        var FlameDamage = 1
        var MaxDistance = 30

        var Duration = 300 //Arbitrary number
        var Thread = Java.type("java.lang.Thread");
        var MyThread = Java.extend(Thread, {
            run: function () {
                npc.getStoreddata().put("AA", 1)
                var V = 0.55
                //Cone Angle Parameters
                var Range = [-0.4, 0.4]
                var RangeV = [-0.2, 0]
                var d = FrontVectors(npc, 0, 0, 1, 1)
                var dist = 1
                for (var p = 0; p < Duration; ++p) {
                    if (p % 15 == 0) {
                        if (dist >= MaxDistance) dist = 1;
                        var R = npc.getRotation()
                        if (npc.isAttacking()) R = GetPlayerRotation(npc, npc.getAttackTarget())
                        var f = FrontVectors(npc, 0, 0, dist, 1);
                        ArcMeF(event, npc, R - 60, R + 60, 0, 0, 2, 0.9 + f[1], -1 + dist, 10, 0, "cofh_core:frost", -1, 0, 0, 0, 0, FlameDamage, 1)
                        var dist = dist + 1
                    }
                    if (p % 10 == 0) {
                        var R = npc.getRotation()
                        if (npc.isAttacking()) R = GetPlayerRotation(npc, npc.getAttackTarget())
                        var d = FrontVectors(npc, R, 0, 1, 0);
                        // npc.world.playSoundAt(npc.getPos(), "ancientspellcraft:spell.pyrokinesis.end", 5, Math.random() * 0.4 - 0.2 + 0.8);
                    }
                    var dx = (Math.random() * (Range[1] - Range[0])) + Range[0]
                    var dy = (Math.random() * (RangeV[1] - RangeV[0])) + RangeV[0]
                    var dz = (Math.random() * (Range[1] - Range[0])) + Range[0]
                    var dv = (Math.random() * (RangeV[1] - RangeV[0])) + RangeV[0]
                    npc.world.spawnParticle("cofh_core:frost", npc.x, npc.y + 1.5, npc.z, d[0] + dx, d[1] + dy + f[1] / dist, d[2] + dz, V + dv, 0)
                    Thread.sleep(10)
                }
                npc.getStoreddata().put("AA", 0)
                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
            }

        });
        var H = new MyThread();
        H.start();
    },
    3: function MagicSlash(event, npc) {
        var linesBefore = 5
        var linesAfter = 2
        var Resolution = 10
        var Particle = "cofh_core:frost"
        var Particle2 = "witch"
        var Count = 1
        var dx = 0
        var dy = 0
        var dz = 0
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
                        ParticleLine(npc, linesL[i].x2, npc.y-0.9, linesL[i].z2, linesL[i].x1, npc.y-0.9, linesL[i].z1, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)
                    }else ParticleLine(npc, linesL[i].x1, npc.y-0.9, linesL[i].z1, linesL[i].x2, npc.y-0.9, linesL[i].z2, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)
                    Thread.sleep(75)
                }
                Thread.sleep(250)
                dx = 0.5
        var dy = 2
        var dz = 0.5
        var Count = 10
        var Speed = 4
        var Range = 2
        var Dmg = 5
        var Particle2 = "crit"

                for(var i = 0; i < linesL.length; i++){
                    var flip = Math.floor(Math.random() * 100)
                    if(flip > 50){
                        ParticleLine(npc, linesL[i].x2, npc.y-1.99, linesL[i].z2, linesL[i].x1, npc.y-1.99, linesL[i].z1, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)
                        ParticleLine(npc, linesL[i].x2, npc.y-1.99, linesL[i].z2, linesL[i].x1, npc.y-1.99, linesL[i].z1, Resolution, Speed, Particle2, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                    }else {
                        ParticleLine(npc, linesL[i].x1, npc.y-1.99, linesL[i].z1, linesL[i].x2, npc.y-1.99, linesL[i].z2, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)
                        ParticleLine(npc, linesL[i].x2, npc.y-1.99, linesL[i].z2, linesL[i].x1, npc.y-1.99, linesL[i].z1, Resolution, Speed, Particle2, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                    }
                    Thread.sleep(50)
                }


                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
        }
        }); var T = new myThread(); T.start();
    },
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
function ArcMeF(event, entity, dr1, dr2, dp1, dp2, dist, shiftV, shiftH, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, ID, Sound, Pitch) {
    var BurnTime = 3
    var IgnitesBlocks = false
    var FlameDamage = 2
    var Thread = Java.type("java.lang.Thread");
    var HankThread = Java.extend(Thread, {
        run: function () {
            if (!dx) { dx = 0 }; if (!dy) { dy = 0 }; if (!dz) { dz = 0 }; if (!dv) { dv = 0 }
            if (!Dmg) { Dmg = 0 }; if (!Range) { Range = 0 }; if (!ID) { ID = 0 }
            if (Count < 0) {
                Count = Math.abs(Count)
                var Mode = 0
            }
            else { var Mode = 1 }
            var P1 = FrontVectors(entity, dr1, dp1, dist, Mode);
            var P2 = FrontVectors(entity, dr2, dp2, dist, Mode);
            var C = Math.acos((P1[0] * P2[0] + P1[1] * P2[1] + P1[2] * P2[2]) / (dist * dist))
            var xPoints = []
            var yPoints = []
            var zPoints = []
            for (var c = 0; c <= Resolution; ++c) {
                var a = c * C / Resolution;
                var x = entity.x + (Math.sin(C - a) * P1[0] + Math.sin(a) * P2[0]) / Math.sin(C);
                var y = entity.y + (Math.sin(C - a) * P1[1] + Math.sin(a) * P2[1]) / Math.sin(C);
                var z = entity.z + (Math.sin(C - a) * P1[2] + Math.sin(a) * P2[2]) / Math.sin(C);
                if (shiftH != 0) {
                    var d = FrontVectors(entity, 0, 0, shiftH, 1);
                    if (Mode == 0) var d = FrontVectors(entity, (dr1 + dr2) / 2, 0, shiftH, 0);
                    x = x + d[0];
                    z = z + d[2];
                }
                y = y + shiftV;
                xPoints.push(x)
                yPoints.push(y)
                zPoints.push(z)
            }
            //SpawnParticles
            for (var i = 0; i < xPoints.length; ++i) {
                if (Sound && i == 10) entity.world.playSoundAt(entity.world.getBlock(xPoints[i], yPoints[i], zPoints[i]).getPos(), Sound, 2, Pitch)
                entity.world.spawnParticle(Particle, xPoints[i], yPoints[i], zPoints[i], dx, dy, dz, dv, Count)
                if (Dmg != 0) {
                    var targs = entity.world.getNearbyEntities(xPoints[i], yPoints[i], zPoints[i], Range + 1, 5)
                    if (IgnitesBlocks && entity.world.getBlock(xPoints[i], yPoints[i], zPoints[i]).isAir() && Math.random() <= 0.08) entity.world.getBlock(xPoints[i], yPoints[i], zPoints[i]).setBlock("minecraft:fire")
                    for (var t = 0; t < targs.length; ++t) {
                        if (targs[t] != entity && TrueDistanceCoord(xPoints[i], yPoints[i], zPoints[i], targs[t].getX(), targs[t].getY() + 1, targs[t].getZ()) <= Range) {
                            //Extra Damage Effects Here
                            //DoActualDamage(entity,Dmg,targs[t],false)
                            event.API.executeCommand(entity.world, "/effect give " + targs[t].displayName + " cofh_core:chilled 2 0 false")
                            targs[t].damage(FlameDamage)
                            return
                        }
                    }
                }
                Thread.sleep(Speed)
            }
        }
    });
    var H = new HankThread();
    H.start();
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


function pushBack(npc, player, Intensity, DistanceScalar, Height){
    var dist = npc.getPos().distanceTo(player.getPos())
    var Str = Intensity + DistanceScalar * dist
    var d = FrontVectors(npc, GetPlayerRotation(npc, player), 0, Intensity, 0)
    player.setMotionX(d[0])
    player.setMotionY(0.2)
    player.setMotionZ(d[2])
}