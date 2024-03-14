var Thread = Java.type("java.lang.Thread");

var AbilityAttemptTime = 6 //seconds
var CircleAttackOptions = {
    Intensity: 0.2,
    MaxRange: 5,
    DistanceScalar: 0.1,
    Speed: 5,
    Particle: "supplementaries:green_flame"
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
    1: function FlameBreath(event, npc) {
        var FlameDamage = 1
        var MaxDistance = 20

        var Duration = 300 //Arbitrary number
        var Thread = Java.type("java.lang.Thread");
        var MyThread = Java.extend(Thread, {
            run: function () {
                npc.getStoreddata().put("AA", 1)
                var V = 0.55
                //Cone Angle Parameters
                var Range = [-0.4, 0.4]
                var RangeV = [-0.2, 0]
                var d = FrontVectors(npc, 0, 0, 1, 0)
                var dist = 1
                for (var p = 0; p < Duration; ++p) {
                    if (p % 15 == 0) {
                        if (dist >= MaxDistance) dist = 1;
                        var R = npc.getRotation()
                        if (npc.isAttacking()) R = GetPlayerRotation(npc, npc.getAttackTarget())
                        var f = FrontVectors(npc, 0, 0, dist, 0);
                        ArcMeF(npc, R - 60, R + 60, 0, 0, 2, 0.9 + f[1], -1 + dist, 10, 0, "smoke", -1, 0, 0, 0, 0, FlameDamage, 1)
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
                    npc.world.spawnParticle("flame", npc.x, npc.y + 1.5, npc.z, d[0] + dx, d[1] + dy + f[1] / dist, d[2] + dz, V + dv, 0)
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
    2: function CircleAttack(event, npc) {
        var Intensity = CircleAttackOptions.Intensity
        var MaxRange = Math.floor(Math.random() * 5 + 10)
        var DistanceScalar = CircleAttackOptions.DistanceScalar
        var Speed = CircleAttackOptions.Speed
        var Particle = "flame"

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
                            npc.world.spawnParticle(Particle, npc.x + d[0], npc.y-0.9, npc.z + d[2], 0.5, 0.1, 0.5, 0, 3)
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
    3: function FlameShot(event, npc) {
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
                        var Item = npc.world.createItem('rootsclassic:mutating_powder', 1)
                        Item.setCustomName("Fire")
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
                npc.world.playSoundAt(npc.getPos(), "botania:endoflame", 5, 0.7)
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
    4: function DeadlyRain(event, npc) {
        var Count = 6
        var Range = 15
        var StartingHeight = 15
        var targ = npc.getAttackTarget()
        if (targ == null) return;
        for (var i = 0; i < Count; ++i) {
            var d = FrontVectors(npc, Math.round(Math.random() * 360), 0, Math.round(Math.random() * Range), 0)
            var Height = StartingHeight + Math.round(Math.random() * 6) - 3
            npc.world.spawnParticle("smoke", targ.x + d[0], targ.y+1, targ.z + d[2], 0.3, 0.5, 0.3, 0.01, 100)
            npc.world.spawnParticle("dripping_lava", targ.x + d[0], targ.y+0.02, targ.z + d[2], 0.3, 0, 0.3, 0.01, 10)
            drawDmgLine(npc, npc.world, targ.getPos().add(d[0], Height, d[2]), targ.getPos().add(d[0], -1, d[2]), 5, "flame", 50, "", 0.05, 0.05, 0.05, 0, 1, 0, 1, 1)
        }
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

function drawDmgLine(entity, world, pos1, pos2, resolution, particle, speed, Sound, dx, dy, dz, dv, count, Damage, Range, ID) {
    var NpcAPI = Java.type("noppes.npcs.api.NpcAPI").Instance();
    var Thread = Java.type("java.lang.Thread");
    var MyThread = Java.extend(Thread, {
        run: function () {
            var drawAmount = Math.ceil(pos1.distanceTo(pos2)) * resolution;
            var subs = pos2.subtract(pos1);
            for (var i = 0; i < drawAmount; i++) {
                var x = (pos1.getX() + subs.getX() * (i / drawAmount) + 0.5).toFixed(4);
                var y = (pos1.getY() + subs.getY() * (i / drawAmount) + 0.5).toFixed(4);
                var z = (pos1.getZ() + subs.getZ() * (i / drawAmount) + 0.5).toFixed(4);
                var cords = x + " " + y + " " + z;
                var output = NpcAPI.executeCommand(world, "/particle " + particle + " " + cords + " " + dx + " " + dy + " " + dz + " " + dv + " " + count);
                var CurrentPos = world.getBlock(x, y, z).getPos()
                world.playSoundAt(CurrentPos, Sound, 1, 1)
                var targs = world.getNearbyEntities(CurrentPos, Range, 5)
                for (var t = 0; t < targs.length; ++t) {
                    if (targs[t] != entity) {
                        //Extra Damage Effects Here
                        Boom(entity, x, y, z)

                    }
                }
                //During Line Effects Here
                if (ID == 1) { }
                //if(!world.getBlock(x,y,z).isAir())Boom(entity,x,y,z)
                Thread.sleep(speed);
            }
            //After Line Effects Here
            if (ID == 1) {
                Boom(entity, x, y, z)
            }
        }
    });
    var th = new MyThread();
    th.start();
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
function Boom(npc, x, y, z) {
    npc.world.spawnParticle("minecraft:large_smoke", x, y + 1, z, 0.5, 0.5, 0.5, 0.1, 50)
    npc.world.spawnParticle("minecraft:explosion", x, y + 1, z, 0.5, 0.5, 0.5, 0.1, 10)
    npc.world.spawnParticle("minecraft:flame", x, y + 1, z, 0.5, 0.5, 0.5, 0.1, 50)
    npc.world.playSoundAt(npc.world.getBlock(x, y + 1, z).getPos(), "minecraft:entity.generic.explode", 3, 1)
    var vics = npc.world.getNearbyEntities(npc.world.getBlock(x, y + 1, z).getPos(), 2, 5)
    for (var i = 0; i < vics.length; ++i) {
        if (vics[i] != npc) {
            vics[i].setMotionY(0.2)
            vics[i].damage(4)
        }
    }
}
