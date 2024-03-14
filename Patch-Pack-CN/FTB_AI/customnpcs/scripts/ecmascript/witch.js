var Thread = Java.type("java.lang.Thread")
var elements = ["earth", "fire", "water", "air"]
var AbilityAttemptTime = 2
var spawn = {x:-39, y: 59, z:-2}
var phaseThreshold = {}
var NormalWalkingSpeed = 3
var AttackDamage = 5
var ExplosionDamage = 10


var Colors = {
    fire: 16711680,
    water: 4697343,
    earth: 6014771,
    air: 16771505

}
/*
function moveBody(npc, pose){

    moveBodypart(npc, pose.head)
    moveBodypart(npc, pose.body)
    moveBodypart(npc, pose.arm.left)
    moveBodypart(npc, pose.arm.right)
    moveBodypart(npc, pose.leg.left)
    moveBodypart(npc, pose.leg.right)
    
}
function moveBodypart(npc, bodyPart){
    var puppet = npc.job
    var origin = {
        x:puppet.getPart(bodyPart.id).getRotationX(),
        y:puppet.getPart(bodyPart.id).getRotationY(),
        z:puppet.getPart(bodyPart.id).getRotationZ()
    }
    if(
        bodyPart.x == origin.x &&
        bodyPart.y == origin.y &&
        bodyPart.z == origin.z
    ) return
    
    var ease = bodyPart.ease
    var animationDelay = bodyPart.animationDelay
    var animationResolution = bodyPart.animationResolution


    var MyThread = Java.extend(Thread, {
        run: function() {
            for (var i = 0; i <= animationResolution; i++){
                var t
                if(ease == "none") t = i/animationResolution
                else  t = ease(i/animationResolution)
                
                var iRot = {
                    x: lerp(origin.x, bodyPart.x, t),
                    y: lerp(origin.y, bodyPart.y, t),
                    z: lerp(origin.z, bodyPart.z, t)
                };
                puppet.getPart(bodyPart.id).setRotation(iRot.x, iRot.y, iRot.z)
                npc.updateClient()
                // MCEntity.f_19864_ = true

                Thread.sleep(animationDelay)
            }
        }
    }); var th = new MyThread(); th.start()
}
function animateList(npc, list){

    var MyThread = Java.extend(Thread, {
        run: function() {
            for(var i = 0; i < list.length; i++){
                var cur_animation = list[i]
                //get all animation delay*resolution and get the highest value
                var times = [
                    cur_animation.head.animationDelay*cur_animation.head.animationResolution,
                    cur_animation.arm.left.animationDelay*cur_animation.arm.left.animationResolution,
                    cur_animation.arm.right.animationDelay*cur_animation.arm.right.animationResolution,
                    cur_animation.body.animationDelay*cur_animation.body.animationResolution,
                    cur_animation.leg.left.animationDelay*cur_animation.leg.left.animationResolution,
                    cur_animation.leg.right.animationDelay*cur_animation.leg.right.animationResolution,
                ]
                
                var duration = Math.max(times[0], times[1], times[2], times[3], times[4], times[5])
                moveBody(npc, list[i])
                Thread.sleep(duration+200)
            }
        }
    }); var th = new MyThread(); th.start()
}

var Ease = {
    "none": "none",
    "easeInQuadratic": easeInQuadratic,
    "easeOutQuadratic": easeOutQuadratic,
    "easeInOutQuadratic": easeInOutQuadratic,
    "easeInQuartic": easeInQuartic,
    "easeOutQuartic": easeOutQuartic,
    "easeInOutQuartic": easeInOutQuartic,
    "easeInExponential": easeInExponential,
    "easeOutExponential": easeOutExponential,
    "easeInOutExponential": easeInOutExponential,
    "easeInCircular": easeInCircular,
    "easeOutCircular": easeOutCircular,
    "easeInOutCircular": easeInOutCircular,
    "easeInElastic": easeInElastic,
    "easeOutElastic": easeOutElastic,
    "easeInOutElastic": easeInOutElastic,
    "easeInBounce": easeInBounce,
    "easeOutBounce": easeOutBounce,
    "easeInOutBounce": easeInOutBounce,
    "easeInSine": easeInSine,
    "easeOutSine": easeOutSine,
    "easeInOutSine": easeInOutSine,
    "easeInCubic": easeInCubic,
    "easeOutCubic": easeOutCubic,
    "easeInOutCubic": easeInOutCubic,
    "easeInQuint": easeInQuintic,
    "easeOutQuint": easeOutQuintic,
    "easeInOutQuint": easeInOutQuintic,
    "easeInBack": easeInBack,
    "easeOutBack": easeOutBack,
    "easeInOutBack": easeInOutBack
}
//Quadratic Easing:
var easeInQuadratic = function(t) {
    return t * t;
}

var easeOutQuadratic = function(t) {
    return 1 - (1 - t) * (1 - t);
}

var easeInOutQuadratic = function(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}


//Quartic Easing:
var easeInQuartic = function(t) {
    return t * t * t * t;
}

var easeOutQuartic = function(t) {
    return 1 - Math.pow(1 - t, 4);
}

var easeInOutQuartic = function(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}


//Exponential Easing:
var easeInExponential = function(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}

var easeOutExponential = function(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

var easeInOutExponential = function(t) {
    return t === 0
        ? 0
        : t === 1
            ? 1
            : t < 0.5
                ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2;
}


//Elastic Easing:
var easeInElastic = function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3);
}

var easeOutElastic = function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
}

var easeInOutElastic = function(t) {
    return t === 0
        ? 0
        : t === 1
            ? 1
            : t < 0.5
                ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2
                : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2 + 1;
}


//Bounce Easing
var easeInBounce = function(t) {
    return 1 - easeOutBounce(1 - t);
}
var easeOutBounce = function(t) {
    var bounce = 7.5625
    if (t < 1 / 2.75) {
        return bounce * t * t;
    } else if (t < 2 / 2.75) {
        return bounce * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        return bounce * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
        return bounce * (t -= 2.625 / 2.75) * t + 0.984375;
    }
}
var easeInOutBounce = function(t) {
    return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;
}


//Sine Easing:
var easeInSine = function(t) {
    return 1 - Math.cos((t * Math.PI) / 2);
}

var easeOutSine = function(t) {
    return Math.sin((t * Math.PI) / 2);
}

var easeInOutSine = function(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}


//Cubic Easing:
var easeInCubic = function(t) {
    return t * t * t;
}

var easeOutCubic = function(t) {
    return 1 - Math.pow(1 - t, 3);
}

var easeInOutCubic = function(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


//Quintic Easing:
var easeInQuintic = function(t) {
    return t * t * t * t * t;
}

var easeOutQuintic = function(t) {
    return 1 - Math.pow(1 - t, 5);
}

var easeInOutQuintic = function(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}


//Circular Easing:
var easeInCircular = function(t) {
    return 1 - Math.sqrt(1 - t * t);
}

var easeOutCircular = function(t) {
    return Math.sqrt(1 - Math.pow(t - 1, 2));
}

var easeInOutCircular = function(t) {
    return t < 0.5 ? (1 - Math.sqrt(1 - 4 * t * t)) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
}

// Back Easing:
var easeInBack = function(t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
var easeOutBack = function(t) {
    var s = 1.70158;
    return 1 - (--t) * (t) * ((s + 1) * t + s);
}

var easeInOutBack = function(t) {
    var s = 1.70158 * 1.525;
    return t < 0.5
        ? 0.5 * (t * t * ((s + 1) * t - s * 1.525))
        : 0.5 * ((t -= 2) * t * ((s + 1) * t + s * 1.525) + 2);
}

var saved_poses_array = {
    default: {
        "head": {
         "id": 0,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 2,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        }
    },
    wandInAir: {
        "head": {
         "id": 0,
         "x": 129,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 180,
          "y": 180,
          "z": 163,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 2,
          "x": 171,
          "y": 268,
          "z": 296,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        }
    },
    boxingPose: {
        "head": {
         "id": 0,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 100,
          "y": 220,
          "z": 120,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 2,
          "x": 100,
          "y": 140,
          "z": 240,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        }
    },
    hands_down: {
        "head": {
         "id": 0,
         "x": 220,
         "y": 163,
         "z": 178,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 207,
          "y": 223,
          "z": 159,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 2,
          "x": 168,
          "y": 111,
          "z": 207,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        }
    },
    hands_up: {
        "head": {
         "id": 0,
         "x": 141,
         "y": 204,
         "z": 146,
         "ease": Ease.none,
         "animationDelay": 30,
         "animationResolution": 15
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 42,
          "y": 204,
          "z": 146,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 2,
          "x": 171,
          "y": 268,
          "z": 296,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        }
    },
    hands_both_up: {
        "head": {
         "id": 0,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 164,
          "y": 78,
          "z": 79,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 2,
          "animationResolution": 250
         },
         "right": {
          "id": 2,
          "x": 180,
          "y": 292,
          "z": 294,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 2,
          "animationResolution": 300
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        }
    },
    hands_both_down: {
    "head": {
        "id": 0,
        "x": 210,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
    },
    "body": {
        "id": 3,
        "x": 180,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
    },
    "arm": {
        "left": {
        "id": 1,
        "x": 145,
        "y": 220,
        "z": 120,
        "ease": Ease.easeInOutExponential,
        "animationDelay": 2,
        "animationResolution": 250
        },
        "right": {
        "id": 2,
        "x": 128,
        "y": 143,
        "z": 255,
        "ease": Ease.easeInOutExponential,
        "animationDelay": 2,
        "animationResolution": 250
        }
    },
    "leg": {
        "left": {
        "id": 4,
        "x": 180,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
        },
        "right": {
        "id": 5,
        "x": 180,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
        }
    }
    }
}

*/


var damageBlacklist = [
    'magic',
    'lightningBolt',
    'trident',
    'thrown',
    'generic'
]
function damaged(event) {
    var npc = event.npc
    if(npc.getStoreddata().get("invulnerable") == true) event.setCanceled(true)
    var damageSource = event.damageSource 
    var roll = Math.floor(Math.random() * 100)
    // if(roll > 75 && damageSource.getType() == "player") attack["fire"]["3"](event.npc)
    for(var damage in damageBlacklist){
        if(damageSource.getType() == damageBlacklist[damage]) event.setCanceled(true)
    }

    if (damageSource.getType() == "explosion") {
        event.setCanceled(true)
        var Thread = Java.type("java.lang.Thread");
        var MyThread = Java.extend(Thread, {
            run: function () {
                Thread.sleep(10)
                npc.setMotionX(0)
                npc.setMotionY(0)
                npc.setMotionZ(0)
            }
        });
        var th = new MyThread();
        th.start();
    }
}

function meleeAttack(event){
    var npc = event.npc
}

function rangedAttack(event){

}

function target(event){
    var npc = event.npc
    // attack["water"]["1"](npc)
}

function targetLost(event){
    var npc = event.npc
}

function timer(event){
    var npc = event.npc
    var storedData = npc.getStoreddata()
    // if(storedData.get("phase") == 2) return
    var chance = 0
    switch(event.id){
        case 1: {
            if(storedData.get("attacking") == "true") {
                // npc.say("still attacking, return early")
                return
            } 
            storedData.put("attacking", "true")
            if(storedData.get("phase") == 2 && Math.floor(Math.random() * 100) < 5) {
                var randomAttackIndex = Math.floor(Math.random() * Object.keys(specialAttacks).length + 1)
                specialAttacks[randomAttackIndex](event, npc)
                return
            } else{
                var element = getElement(npc)
                var randomAttackIndex = Math.floor(Math.random() * Object.keys(attack[element]).length + 1)
                // npc.say("My Element is " + element + " doing attack nr: " + randomAttackIndex)
                attack[element][randomAttackIndex](event, npc)
            }
            break
        }
        // Element Changer
        case 2: {
            setElement(npc)
            // npc.say('Next Element: ' + getElement(npc))

            
            break
        }
    }
}

function tick(event){
    var npc = event.npc
    var currentPhase = npc.getStoreddata().get("phase") 

    if(npc.health > npc.maxHealth*0.6 && currentPhase == 2){    
        npc.getStoreddata().put("phase", 1)
        setPhase(npc, 1)
    }
    if(npc.health < npc.maxHealth*0.5 && currentPhase == 1) {
        npc.getStoreddata().put("phase", 2)
        setPhase(npc, 2)
    }
}



function RandomElement(){
    var randomIndex = Math.floor(Math.random() * elements.length)
    return elements[randomIndex]
}

function setElement(npc){
    for(var element in elements){
        if(npc.hasTag(elements[element])) npc.removeTag(elements[element])
    }
    var element = RandomElement()
    npc.addTag(element)
    var mainItem = npc.getMainhandItem()
    var offItem = npc.getOffhandItem()
    mainItem.setColor(Colors[element])
    offItem.setColor(Colors[element])
    var boots = npc.getArmor(0)
    var leggings = npc.getArmor(1)
    var chestplate = npc.getArmor(2)
    var helmet = npc.getArmor(3)
    boots.nbt.getCompound("display").setInteger("color", Colors[element])
    chestplate.nbt.getCompound("display").setInteger("color", Colors[element])
    helmet.nbt.getCompound("display").setInteger("color", Colors[element])
    return element
}

function getElement(npc){
    for(var element in elements){
        if(npc.hasTag(elements[element])) return elements[element]
    }
}



function setPhase(npc, phase) {
    switch(phase){
        case 1: {
            npc.say("你打不过我的！")
            break
        }
        case 2: {
            npc.say("你激怒我了！")
            break
            //Spawn Gateway here!
        }
        case 3: {
            npc.say("你真的激怒我了！阶段3")
            break

        }
    }
}



var attack = {
    fire: {
        1: function CircleAttack(event, npc) {
            var Intensity = CircleAttackOptions.Intensity
            var MaxRange = CircleAttackOptions.MaxRange
            var Speed = CircleAttackOptions.Speed
            var Particle = CircleAttackOptions.Particle
        
            //var Thread = Java.type("java.lang.Thread");
            var myThread = Java.extend(Thread, {
                run: function () {
                    npc.world.playSoundAt(npc.getPos(), "minecraft:entity.blaze.shoot", 1, 1)
                    var vics = npc.world.getNearbyEntities(npc.x, npc.y, npc.z, MaxRange, 5)
                    
                    for (var k = 0; k < MaxRange * 2; ++k) {
                        for (var i = 0; i < 72; i++) {
                            var d = FrontVectors(npc, i * 5, 0, k / 2 * (Intensity / Math.abs(Intensity)), 0)
                            npc.world.spawnParticle("smoke", npc.x + d[0], npc.y, npc.z + d[2], 0.2, 0, 0.2, 0, 2)
                        }
                        Thread.sleep(2)
                    }
                    Thread.sleep(200)
                    for (var j = 0; j < vics.length; ++j) {
                        if (vics[j] != npc) {
                            pushBack(npc, vics[j], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.4)
                        }}
                    for (var k = 0; k < MaxRange * 2; ++k) {
                        for (var i = 0; i < 72; i++) {
                            var d = FrontVectors(npc, i * 5, 0, k / 2 * (Intensity / Math.abs(Intensity)), 0)
                            npc.world.spawnParticle(Particle, npc.x + d[0], npc.y+0.2, npc.z + d[2], 0.2, 0.1, 0.2, 0, 1)
                        }
                        Thread.sleep(20)
                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            }); var T = new myThread(); T.start();
        },
        2: function BoomDash(event, npc) {
            var DashIntensity = 1
            //var Thread = Java.type("java.lang.Thread");
            var myThread = Java.extend(Thread, {
                run: function () {
                    var targ = npc.getAttackTarget()
                    if (targ == null) {
                        var storedData = npc.getStoreddata()
                        storedData.put("attacking", "false")
                        return};
                    npc.ai.setWalkingSpeed(1)
                    Thread.sleep(800)
                    var d = FrontVectors(npc, GetPlayerRotation(npc, targ), 0, DashIntensity, 0)
                    Thread.sleep(200)
                    npc.world.playSoundAt(npc.getPos(), "minecraft:entity.blaze.shoot", 1, 1)
                    // swingArm(npc, Pos1, Pos2)
                    for (var i = 0; i < 16; i++) {
                        DelayedExplosion(npc, i)
                        npc.setMotionX(d[0])
                        npc.setMotionZ(d[2])
                        Thread.sleep(100)
                    }
                    npc.ai.setWalkingSpeed(NormalWalkingSpeed)
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            });
            var T = new myThread();
            T.start();
        },
        3: function castCircleWall(event, npc){
            //var Thread = Java.type("java.lang.Thread");
            var MyThread = Java.extend(Thread, {
                run: function () {
                    // var animation_list = [
                    //     saved_poses_array.default, 
                    //     saved_poses_array.hands_down, 
                    //     saved_poses_array.hands_up,
                    //     saved_poses_array.default
                    // ]
                
                    // animateList(npc, animation_list)
                    // Thread.sleep(1750)
                    var angle = 0
                    var x = npc.x
                    var y = npc.y + 1.5
                    var z = npc.z
        
                    for(angle = 0; angle < 360; angle +=10){
                        var dx = -Math.sin(angle * Math.PI / 180) * 3
                        var dz = Math.cos(angle * Math.PI / 180) * 3
                        npc.world.spawnParticle("flame", x + dx, y, z + dz, 0.3, 0.3, 0.3, 0, 50)
        
                        var toHit = npc.world.getNearbyEntities(x + dx, y, z + dz, 1, 1)
                        for (var i = 0; i < toHit.length; i++) {
                            toHit[i].damage(1)
                            pushBack(npc, toHit[i], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.2)
        
                        };
        
                        angle = angle + 10
                        Thread.sleep(40)
                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            }); var T = new MyThread(); T.start();
        },
        4: function FlameBreath(event, npc) {
            var FlameDamage = 1
            var MaxDistance = 25

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
        }
   
    },
    water: {
        1: function castCircleWall(event, npc){
            //var Thread = Java.type("java.lang.Thread");
            var MyThread = Java.extend(Thread, {
                run: function () {
                    var angle = 0
                    var x = npc.x
                    var y = npc.y + 1.5
                    var z = npc.z
        
                    for(angle = 0; angle < 360; angle +=10){
                        var dx = -Math.sin(angle * Math.PI / 180) * 3
                        var dz = Math.cos(angle * Math.PI / 180) * 3
                        npc.world.spawnParticle("splash", x + dx, y, z + dz, 0.3, 0.3, 0.3, 0, 50)
        
                        var toHit = npc.world.getNearbyEntities(x + dx, y, z + dz, 1, 1)
                        for (var i = 0; i < toHit.length; i++) {
                            toHit[i].damage(1)
                            pushBack(npc, toHit[i], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.2)
        
                        };
                        npc.world.spawnParticle("bubble", x + dx, y, z + dz, 0.3, 0.3, 0.3, 0, 100)

                        angle = angle + 10
                        Thread.sleep(40)
                        npc.world.spawnParticle("bubble_pop", x + dx, y, z + dz, 0.3, 0.3, 0.3, 0, 100)

                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            }); var T = new MyThread(); T.start();
        },
        2: function ForceChoke(event, npc) {

            var ChokeDuration = 3
            var Thread = Java.type("java.lang.Thread");
            var MyThread = Java.extend(Thread, {
                run: function () {
                    var targ = npc.getAttackTarget()
                    if (targ == null) {
                        var storedData = npc.getStoreddata()
                        storedData.put("attacking", "false")
                        return};
    
                    npc.getJob().getPart(0).setRotation(172, 180, 180) //Head
                    npc.getJob().getPart(1).setRotation(210, 177, 159) //Left Arm
                    npc.getJob().getPart(2).setRotation(93, 180, 218) //Right Arm
                    npc.getJob().getPart(3).setRotation(180, 180, 180) //Body
                    npc.getJob().getPart(4).setRotation(164, 180, 172) //Left Leg
                    npc.getJob().getPart(5).setRotation(180, 200, 187) //Right Leg
                    npc.updateClient()
                    npc.ai.setWalkingSpeed(0)
                    event.API.executeCommand(entity.world, "/effect give " + targ.displayName + " cofh_core:chilled 3 0 false")

                    // targ.addPotionEffect(20, ChokeDuration, 1, false)
                    for (var i = 0; i < ChokeDuration * 10; i++) {
                        targ.setMotionY(0.07)
                        Thread.sleep(100)
                    }
                    for (var i = 0; i < 6; i++) {
                        npc.getJob().getPart(i).setRotation(180, 180, 180)
                    }
                    npc.updateClient()
                    npc.ai.setWalkingSpeed(NormalWalkingSpeed)
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            });
            var H = new MyThread();
            H.start();
        },
        // 3: function SpawnDrownedRing(event, npc) {
        //     var NpcAPI = Java.type("noppes.npcs.api.NpcAPI").Instance();
        //     var targ = npc.getAttackTarget()
        //     if (targ == null) {
        //                 var storedData = npc.getStoreddata()
        //                 storedData.put("attacking", "false")
        //                 return};
        //     var entities = npc.world.getNearbyEntities(npc.x, npc.y, npc.z, 64, 3)
        //     for(var i = 0; i < entities.length; i++){
        //         if(entities[i].getName() == "Drowned") return
        //     }
        //     npc.world.spawnParticle("witch", npc.x, npc.y + 1, npc.z, 0.3, 0.5, 0.3, 0, 50)
        //     npc.world.playSoundAt(targ.getPos(), "minecraft:entity.endermen.teleport", 1, 1)
        //     for (var i = 0; i < 5; i++) {
        //         var d = FrontVectors(targ, i * 72, 0, 7, 0)
        //         // npc.say(targ.x+d[0])
        //         npc.world.spawnParticle("cloud", targ.x + d[0], targ.y + 1, targ.z + d[2], 0.3, 0.5, 0.3, 0, 15)
        //         event.API.executeCommand(npc.world, "/summon drowned " + Math.floor(targ.x + d[0])  + " " + Math.floor(targ.y + 1) + " " + Math.floor(targ.z + d[2]) + " {HandItems:[{id:trident,Count:1}],HandDropChances:[f],ArmorItems:[{},{},{},{id:acacia_button,Count:1}],ArmorDropChances:[0f,0f,0f,0f]}")
        //         Thread.sleep(10)
       
        //         // var clone = NpcAPI.clones.spawn(targ.x + d[0], targ.y, targ.z + d[2], CloneTab, CloneName, targ.world)
        //         // clone.setAttackTarget(targ)
        //     }
        //     var entities = npc.world.getNearbyEntities(npc.x, npc.y, npc.z, 64, 3)
        //     for(var i = 0; i < entities.length; i++){
        //         if(entities[i].getName() == "Drowned") entities[i].setAttackTarget(targ)
        //     }
        //     var storedData = npc.getStoreddata()
        //     storedData.put("attacking", "false")
        // },
        3: function Kamehameha(event, npc){
            var distance = 20
            var damage = 5
            var x= npc.x;
            var y= npc.y+1;
            var z= npc.z;
            var disparo2=false;
            npc.ai.setWalkingSpeed(0)
      
            var Thread = Java.type("java.lang.Thread");
            var MyThread = Java.extend(Thread,{
            run: function(){
                var targ = npc.getAttackTarget()
                if (targ == null) {
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                    return};

               var angle = GetPlayerRotation(npc, targ)
      
                for(var lon=0;lon<distance;lon+=0.3){
                    for(T=0;T<2*Math.PI;T+=0.2){
            
                            var dx=-Math.sin(angle*Math.PI/180)*lon;
                            var dz = Math.cos(angle*Math.PI/180)*lon;


                            // var x1 = npc.x + d[0]
                            // var y1 = npc.y
                            // var z1 = npc.z + d[2]

                            var x1=x+dx;
                            var y1=y;
                            var z1=z+dz;
                    
                            var T;
                            var dx1,dy1,dz1;
                            var r=0.7; 
                            
                            if(dx>=0.707105  && dz>=-0.707107 && dz<=0.707107){
                                disparo2=true;
                            }
                            if(dx<-0.707106 && dz>-0.707106 && dz<0.707106){
                                disparo2=true;
                            }
            
                                var dx1=r*Math.cos(T);
                                var dy1=r*Math.sin(T);
                                var dz1=0;
            
                            
                            if(disparo2==true){
                                var dx1=0;
                                var dy1=r*Math.sin(T);
                                var dz1=r*Math.cos(T);
                            }
            
                            npc.world.spawnParticle("soul_fire_flame",x1+dx1,y1+dy1,z1+dz1,0,0,0,0,1)
                            npc.world.spawnParticle("end_rod",x1,y1+0.1,z1,0.2,0.2,0.2,0,1)
                            var toHit = npc.world.getNearbyEntities(x1, y1, z1, 1, 1)
                            for (var i = 0; i < toHit.length; i++) {
                                toHit[i].damage(damage)
                                pushBack(npc, toHit[i], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.2)
            
                            };
                            
                        
                    }Thread.sleep(50)
                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            });
            var H = new MyThread();
            H.start();
      
      
          }
    },
    earth: {
        1: function Fangs(event, npc) {
            var Distance = 10
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
                    for (var i = 0; i < Distance; i++) {
                        var d = FrontVectors(npc, GetPlayerRotation(npc, targ), 0, 2 + i, 0)
                        var x = npc.x + d[0]
                        var y = npc.y
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
        2: function Dig(event, npc) {
            var NpcNormalMov = 3 //The normal movement speed of the NPC
            var Thread = Java.type("java.lang.Thread");
            var MyThread = Java.extend(Thread, {
                run: function () {
                    var targ = npc.getAttackTarget()
                    if (targ == null) {
                        var storedData = npc.getStoreddata()
                        storedData.put("attacking", "false")
                        return};
                    npc.ai.setWalkingSpeed(0)
                    var DigCoords = [npc.x, npc.y + 1, npc.z]
                    for (var i = 0; i < 4; i++) { //Digging down
                        npc.world.playSoundAt(npc.getPos(), "minecraft:block.gravel.break", 1, 1)
                        event.API.executeCommand(npc.world, "/particle block minecraft:magenta_stained_glass " + npc.x + " " + (npc.y + i * 0.2) + " " + npc.z + " 0.3 0.3 0.3 0 30 force")
                        if (i == 2) npc.setPosition(npc.x, npc.y - 2, npc.z)
                        Thread.sleep(400)
                    }
                    var DigCoords = [npc.x, npc.y + 1, npc.z]
                    //Hiding NPC
                    npc.world.playSoundAt(npc.getPos(), "minecraft:block.gravel.break", 1, 1.3)
                    npc.setPosition(npc.x, -3, npc.z)
                    npc.ai.setNavigationType(1)
                    Thread.sleep(2000)
                    //Setting NPC Behind player
                    npc.ai.setNavigationType(0)
                    var d = FrontVectors(targ, 180, 0, 3, 1)
                    if (!npc.world.getBlock(targ.x + d[0], targ.y + 1, targ.z + d[2]).isAir()) { //Block check
                        npc.setPosition(DigCoords[0], DigCoords[1], DigCoords[2])
                    }
                    else { npc.setPosition(targ.x + d[0], targ.y, targ.z + d[2]) }
                    event.API.executeCommand(npc.world, "/particle block minecraft:magenta_stained_glass " + npc.x + " " + (npc.y) + " " + npc.z + " 0.5 1 0.5 0 100 force")
                    npc.world.playSoundAt(npc.getPos(), "minecraft:block.gravel.break", 1, 0.8)
                    npc.ai.setWalkingSpeed(NormalWalkingSpeed)
                    npc.setAttackTarget(targ)
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            });
            var H = new MyThread();
            H.start();
        },
        // // 3: function RazorLeaf(event, npc) {
        //     var LeafDamage = 2.0
        //     var Thread = Java.type("java.lang.Thread");
        //     var MyThread = Java.extend(Thread, {
        //         run: function () {
        //             var d = FrontVectors(npc, 0, 0, 1, 1)
        //             var f = FrontVectors(npc, -90, 0, 0.75, 1)
        //             var targ = npc.world.getClosestEntity(npc.getPos(), 20, 1)
        //             if (targ == null) {
        //                 var storedData = npc.getStoreddata()
        //                 storedData.put("attacking", "false")
        //                 return};
        //             var Ps = []
        //             for (var i = -2; i <= 2; i++) {
        //                 for (var j = 1; j <= 5; ++j) {
        //                     if ((i == 2 || i == -2) && (j == 1 || j == 5)) continue;
        //                     var P = npc.world.createEntity('customnpcs:customnpcprojectile')
        //                     var Item = npc.world.createItem('minecraft:green_dye', 1)
        //                     Item.setCustomName("Leaf")
        //                     P.setItem(Item)
        //                     P.setPosition(npc.x + d[0] + i * f[0], npc.y + j * 0.5, npc.z + d[2] + i * f[2])
        //                     npc.world.spawnEntity(P)
        //                     npc.world.spawnParticle("large_smoke", npc.x + d[0] + i * f[0], npc.y + j * 0.5, npc.z + d[2] + i * f[2], 0, 0, 0, 0, 1)
        //                     var n = P.getEntityNbt()
        //                     n.setFloat("damagev2", LeafDamage)
        //                     P.setEntityNbt(n)
        //                     Ps.push(P)
        //                 }
        //             }
        //             npc.world.playSoundAt(npc.getPos(), "minecraft:block.grass.place", 5, 0.7)
        //             Thread.sleep(800)
        //             var Total = Ps.length
        //             for (var i = 0; i < Total; i++) {
        //                 var index = parseInt(Math.random() * Ps.length)
        //                 // npc.world.playSoundAt(npc.getPos(), "dsurround:tool.swing", 5, 1.2)
        //                 Ps[index].setHeading(targ.x + Math.random(), targ.y + 1 + Math.random() * 0.25, targ.z + Math.random())
        //                 Thread.sleep(200)
        //                 Ps.splice(index, 1)

        //             }
        //             var storedData = npc.getStoreddata()
        //             storedData.put("attacking", "false")
        //         }
        //     });
        //     var H = new MyThread();
        //     H.start();
        // // },
        3: function FangSlash(event, npc) {
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
                            ParticleLine(npc, linesL[i].x2, npc.y-0.9, linesL[i].z2, linesL[i].x1, npc.y-0.9, linesL[i].z1, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                        }else {
                            ParticleLine(npc, linesL[i].x1, npc.y-0.9, linesL[i].z1, linesL[i].x2, npc.y-0.9, linesL[i].z2, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                        }
                        Thread.sleep(75)
                    }
                    Thread.sleep(250)


                    for(var i = 0; i < linesL.length; i++){
                        var flip = Math.floor(Math.random() * 100)
                        if(flip > 50){
                            for(var j = 0; j < 5; j++){
                                var x = lerp(linesL[i].x2, linesL[i].x1, j/5)
                                var z = lerp(linesL[i].z2, linesL[i].z1, j/5)
                                npc.world.spawnParticle(Particle2, x, npc.y, z, 0.2, 0.2, 0.2, 0.2, 5)
                                Thread.sleep(50)
                                event.API.executeCommand(npc.world, "/summon minecraft:evoker_fangs " + x + " " + npc.y + " " + z)
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
    },
    air: {
        1: function Lightning(event, npc) {
            var animationDelay = 2
            var animationResolution = 100
            //var Thread = Java.type("java.lang.Thread");
            var myThread = Java.extend(Thread, {
                run: function () {
                    Thread.sleep(animationDelay*animationResolution+20)
                    var ExtraDamage = 3 //Additional damage dealt by the lightning
                    var distAway = 3 //The distance away from the target the lightning can spawn
                    var Delay = 40 //Ticks before causing the lightning strike after telegraph appears
                    //Get Position and start telegraph
                    var targ = npc.getAttackTarget()
                    if (targ == null) {
                        var storedData = npc.getStoreddata()
                        storedData.put("attacking", "false")
                        return};
                    var Spot = targ.getPos().add(Math.round(Math.random() * distAway * 2) - distAway, 0, Math.round(Math.random() * distAway * 2) - distAway)
                    npc.swingMainhand()
                    npc.swingOffhand()
                    npc.world.spawnParticle("cloud", npc.x, npc.y + 2.5, npc.z, 0.2, 0.2, 0.2, 0.2, 105)
                    npc.world.spawnParticle("minecraft:crit", npc.x, npc.y + 2.5, npc.z, 0.2, 0.2, 0.2, 0.2, 55)
                    npc.world.playSoundAt(Spot, "minecraft:entity.blaze.shoot", 1, 1.4)
                    for (var i = 0; i < Delay; i++) {
                        if (i % 10 == 0) npc.world.spawnParticle("cloud", Spot.getX(), Spot.getY() + 0.3, Spot.getZ(), 0, 0, 0, 0.1, 10)
                        Thread.sleep(50)
                    }
        
                    //The Lightning Strike
                    npc.world.thunderStrike(Spot.getX(), Spot.getY(), Spot.getZ())
                    var targs = npc.world.getNearbyEntities(Spot, 2, 5)
                    for (var t = 0; t < targs.length; t++) {
                        if (targs[t] != npc) {
                            targs[t].damage(ExtraDamage)
                        }
                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            });
            var T = new myThread();
            T.start();
        },
        2: function castCircleWall(event, npc){
            //var Thread = Java.type("java.lang.Thread");
            var MyThread = Java.extend(Thread, {
                run: function () {
                    var angle = 0
                    var x = npc.x
                    var y = npc.y + 1.5
                    var z = npc.z
        
                    for(angle = 0; angle < 360; angle +=10){
                        var dx = -Math.sin(angle * Math.PI / 180) * 3
                        var dz = Math.cos(angle * Math.PI / 180) * 3
                        npc.world.spawnParticle("cloud", x + dx, y, z + dz, 0.3, 0.3, 0.3, 0, 50)
                        npc.world.spawnParticle("cofh_core:spark", x + dx, y, z + dz, 0.5, 0.5, 0.5, 0, 50)
        
                        var toHit = npc.world.getNearbyEntities(x + dx, y, z + dz, 1, 1)
                        for (var i = 0; i < toHit.length; i++) {
                            toHit[i].damage(30)
                            pushBack(npc, toHit[i], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.2)
        
                        };
        
                        angle = angle + 10
                        Thread.sleep(40)
                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            }); var T = new MyThread(); T.start();
        },
        3: function BoomLine(event, npc) {
            var BreakBlocks = false;
            var Range = 2;
            var Damage = 10;
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
                    npc.swingMainhand()
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
                            npc.world.spawnParticle("explosion", x, y, z, 0.1, 0.1, 0.1, 0, 1)
                            npc.world.playSoundAt(CurrentPos, "minecraft:entity.generic.explode", 1, 1)
                        }
                        var targs = npc.world.getNearbyEntities(CurrentPos, Range, 5)
                        for (var t = 0; t < targs.length; t++) {
                            if (targs[t] != npc) {
                                targs[t].damage(Damage)
                                pushBack(npc, targs[t], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.4)
                            }
                        }
                        Thread.sleep(Speed)
                        npc.world.spawnParticle("cloud", x, y, z, 0.3, 0.3, 0.3, 0, 15)

                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            }); var T = new myThread(); T.start();
        },
        4: function Teleport(event, npc) {
            //var Thread = Java.type("java.lang.Thread");
            var MyThread = Java.extend(Thread, {
                run: function () {
                    var targ = npc.getAttackTarget()
                    if (targ == null) {
                        var storedData = npc.getStoreddata()
                        storedData.put("attacking", "false")
                        return};
                    npc.ai.setWalkingSpeed(0)
                    npc.ai.setNavigationType(1)
        
                    for (var i = 0; i < 10; i++) {
                        // npc.world.playSoundAt(npc.getPos(), "botania:babylon_attack", 1, 1)
                        npc.world.spawnParticle("end_rod", npc.x, npc.y + 0.5, npc.z, 0, 0, 0, 0.5, 20)
                        npc.setPosition(npc.x, npc.y + 0.5, npc.z)
                        Thread.sleep(100)
                    }
                    //Hiding NPC
                    // npc.world.playSoundAt(npc.getPos(), "botania:babylon_spawn", 1, 1.3)
                    npc.setPosition(npc.x, npc.y + 100, npc.z)
                    npc.ai.setNavigationType(1)
                    Thread.sleep(2000)
                    //Setting NPC Behind player
                    npc.ai.setNavigationType(0)
                    var d = FrontVectors(targ, 180, 0, 3, 1)
                    npc.setPosition(targ.x + d[0], targ.y + 5, targ.z + d[2])
                    for (var i = 0; i < 5; i++) {
                        // npc.world.playSoundAt(npc.getPos(), "botania:babylon_attack", 1, 1)
                        npc.world.spawnParticle("end_rod", npc.x, npc.y + 0.5, npc.z, 0, 0, 0, 0.5, 20)
                        npc.setPosition(npc.x, npc.y - 0.5, npc.z)
                        Thread.sleep(100)
                    }
                    npc.world.spawnParticle("end_rod", npc.x, npc.y + 0.5, npc.z, 0, 0, 0, 0.5, 20)
                    // npc.world.playSoundAt(npc.getPos(), "botania:babylon_attack", 1, 0.8)
                    attack.air["5"](event, npc)
                    npc.setAttackTarget(targ)
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
        
                }
            });
            var H = new MyThread();
            H.start();
        },
        5: function CircleAttack(event, npc) {
            var Intensity = CircleAttackOptions.Intensity
            var MaxRange = 10
            var Speed = CircleAttackOptions.Speed
            var Particle = "cloud"
        
            //var Thread = Java.type("java.lang.Thread");
            var myThread = Java.extend(Thread, {
                run: function () {
                    npc.world.playSoundAt(npc.getPos(), "minecraft:entity.blaze.shoot", 1, 1)
                    var vics = npc.world.getNearbyEntities(npc.x, npc.y, npc.z, MaxRange, 5)
                    
                    for (var k = 0; k < MaxRange * 2; ++k) {
                        for (var i = 0; i < 72; i++) {
                            var d = FrontVectors(npc, i * 5, 0, k / 2 * (Intensity / Math.abs(Intensity)), 0)
                            npc.world.spawnParticle("smoke", npc.x + d[0], npc.y, npc.z + d[2], 0.2, 0, 0.2, 0, 2)
                        }
                        Thread.sleep(2)
                    }
                    Thread.sleep(200)
                    for (var j = 0; j < vics.length; ++j) {
                        if (vics[j] != npc) {
                            pushVertical(npc, vics[j], CircleAttackOptions.Intensity, CircleAttackOptions.DistanceScalar, 0.4)
                        }}
                    for (var k = 0; k < MaxRange * 2; ++k) {
                        for (var i = 0; i < 72; i++) {
                            var d = FrontVectors(npc, i * 5, 0, k / 2 * (Intensity / Math.abs(Intensity)), 0)
                            npc.world.spawnParticle(Particle, npc.x + d[0], npc.y+0.3, npc.z + d[2], 0.2, 0.5, 0.2, 0, 1)
                        }
                        Thread.sleep(20)
                    }
                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                }
            }); var T = new myThread(); T.start();
        },
        6: function MagicSlash(event, npc) {
            var linesBefore = 5
            var linesAfter = 2
            var Resolution = 10
            var Speed = 1
            var Particle = "dragon_breath"
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
                    dy = 2
                    dz = 0.5
                    Count = 10
                    Speed = 4
                    Range = 1
                    Dmg = 5
                    Particle = "crit"

                    for(var i = 0; i < linesL.length; i++){
                        var flip = Math.floor(Math.random() * 100)
                        if(flip > 50){
                            ParticleLine(npc, linesL[i].x2, npc.y, linesL[i].z2, linesL[i].x1, npc.y, linesL[i].z1, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)
                            ParticleLine(npc, linesL[i].x2, npc.y, linesL[i].z2, linesL[i].x1, npc.y, linesL[i].z1, Resolution, Speed, Particle2, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                        }else {
                            ParticleLine(npc, linesL[i].x1, npc.y, linesL[i].z1, linesL[i].x2, npc.y, linesL[i].z2, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)
                            ParticleLine(npc, linesL[i].x2, npc.y, linesL[i].z2, linesL[i].x1, npc.y, linesL[i].z1, Resolution, Speed, Particle2, Count, dx, dy, dz, dv, Dmg, Range, Sound, ID)

                        }
                        Thread.sleep(50)
                    }


                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
            }
            }); var T = new myThread(); T.start();
        }
    },
}

var specialAttacks = {
    1: function lightnings(event, npc) {
        npc.timers.stop(1)
        var particle = 'witch'
        var particle2 = 'end_rod'
        var high = 15
        var radio = 1
        var T;
        var x, y, z, dx, dy, dz;
        var targ = npc.getAttackTarget()

        if (targ == null) {
            npc.timers.forceStart(1, 3, true)

            var storedData = npc.getStoreddata()
            storedData.put("attacking", "false")
            return};

        var myThread = Java.extend(Thread, {
            run: function () {
    
                for (var p = 0; p < 2; p++) {
                    x = targ.x;
                    y = targ.y;
                    z = targ.z;
                    for (var a = 0; a < high; a += 0.1) {
                        y = y + a;
                        npc.world.spawnParticle(particle, x, y, z, 0.2, 0.2, 0.2, 0, 50)
                        npc.world.spawnParticle(particle2, x, y, z, 0.2, 0.2, 0.2, 0, 5)
                    }
    
                    for (T = 0; T < 2 * Math.PI; T += 0.09) {
                        y = targ.y + 0.2;
                        dx = radio * Math.cos(T);
                        dy = 0;
                        dz = radio * Math.sin(T);
                        npc.world.spawnParticle(particle, x + dx * 0.5, y + dy, z + dz * 0.5, 0, 0, 0, 0, 2)
                        npc.world.spawnParticle(particle2, x + dx, y + dy, z + dz, 0, 0, 0, 0, 2)
                        npc.world.spawnParticle(particle, x + dx * 1.5, y + dy, z + dz * 1.5, 0, 0, 0, 0, 2)
                    }
    
                    Thread.sleep(2000);
                    npc.world.thunderStrike(x, y, z)
                    var enem = npc.world.getNearbyEntities(x, y, z, 1, 1);

                    Thread.sleep(1500);
    
                }
                npc.timers.forceStart(1, 3, true)
                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
            }
        });
        var t = new myThread();
        t.start();
    },
    2: function sunBeans(event, npc) {
        npc.timers.stop(1)

        var npc = event.npc;
        var x = npc.x;
        var y = npc.y;
        var z = npc.z;
        var center = [-40, 62, -2];
        var sunParts = [0, 0, 0];
    
        var Thread = Java.type("java.lang.Thread");
        var myThread = Java.extend(Thread, {
            run: function () {
    
                var targ = npc.getAttackTarget();
                // npc.say("target?")
                if (targ == null) {
                    npc.timers.forceStart(1, 3, true)

                    var storedData = npc.getStoreddata()
                    storedData.put("attacking", "false")
                    return};
                // sunBeansAnimation(event);
                npc.getStoreddata().put("invulnerable", "true")
                for (var i = 0; i < 30; i++) {
                    animateSunParts(event, 190, "end_rod");
                    Thread.sleep(120);
                }
                Thread.sleep(4000);
    
    
                for (var j = 0; j < 2; j += 0.2) {
                    Sun(npc, 1 + j, 1, "end_rod");
                    Thread.sleep(200);
                }
    
                Sun(npc, 1 + j, 6, "end_rod");
                for (var j = 0; j < 20; j++) {
                    Bean(event, "firework", "cloud");
                    Thread.sleep(300);
                }
                npc.getStoreddata().put("invulnerable", "false")
    
                Thread.sleep(2000)
                npc.timers.forceStart(1, 3, true)
                var storedData = npc.getStoreddata()
                storedData.put("attacking", "false")
            }
        });
        var k = new myThread();
        k.start();
    
    }
}

var CircleAttackOptions = {
    Intensity: 4,
    MaxRange: 7,
    DistanceScalar: 0.1,
    Speed: 80,
    Particle: "minecraft:flame"
}


function DelayedExplosion(npc, a) {
    //var Thread = Java.type("java.lang.Thread");
    var HankThread = Java.extend(Thread, {
        run: function () {
            var x = npc.x
            var y = npc.y + 1
            var z = npc.z
            for (var i = 0; i < 10; i++) {
                npc.world.spawnParticle("flame", x, y, z, 0, 0, 0, 0.03, 5)
                npc.world.spawnParticle("smoke", x, y, z, 0, 0, 0, 0.03, 5)
                Thread.sleep(100 - 2 * a)
            }
            npc.world.playSoundAt(npc.world.getBlock(x, y, z).getPos(), "minecraft:entity.generic.explode", 1, 1)
            npc.world.spawnParticle("large_smoke", x, y, z, 0.3, 0.3, 0.3, 0.2, 50)
            npc.world.spawnParticle("flame", x, y, z, 0.3, 0.3, 0.3, 0.2, 50)
            var vics = npc.world.getNearbyEntities(npc.world.getBlock(x, y, z).getPos(), 2.5, 5)
            for (var i = 0; i < vics.length; i++) {
                if (vics[i] != npc) {
                    vics[i].damage(ExplosionDamage)
                    vics[i].setMotionY(0.3)
                }
            }
        }
    });
    var H = new HankThread();
    H.start();
}
function ArcMeF(entity, dr1, dr2, dp1, dp2, dist, shiftV, shiftH, Resolution, Speed, Particle, Count, dx, dy, dz, dv, Dmg, Range, ID, Sound, Pitch) {
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
            for (var i = 0; i < xPoints.length; i++) {
                if (Sound && i == 10) entity.world.playSoundAt(entity.world.getBlock(xPoints[i], yPoints[i], zPoints[i]).getPos(), Sound, 2, Pitch)
                entity.world.spawnParticle(Particle, xPoints[i], yPoints[i], zPoints[i], dx, dy, dz, dv, Count)
                if (Dmg != 0) {
                    var targs = entity.world.getNearbyEntities(xPoints[i], yPoints[i], zPoints[i], Range + 1, 5)
                    if (IgnitesBlocks && entity.world.getBlock(xPoints[i], yPoints[i], zPoints[i]).isAir() && Math.random() <= 0.08) entity.world.getBlock(xPoints[i], yPoints[i], zPoints[i]).setBlock("minecraft:fire")
                    for (var t = 0; t < targs.length; t++) {
                        if (targs[t] != entity && TrueDistanceCoord(xPoints[i], yPoints[i], zPoints[i], targs[t].getX(), targs[t].getY() + 1, targs[t].getZ()) <= Range) {
                            //Extra Damage Effects Here
                            //DoActualDamage(entity,Dmg,targs[t],false)
                            targs[t].damage(FlameDamage)
                            targs[t].setBurning(BurnTime)
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
function effect(player,potionID,duration,amplifier,isAmbient){
    var PotionEffect = Java.type("net.minecraft.world.effect.MobEffectInstance");
    var potioneffect = new PotionEffect(potionID,duration,amplifier,isAmbient);
    player.getMCEntity().func_70690_d(potioneffect);
}


function Bean(e, particle1, particle2) {

    var npc = e.npc;
    var center = [-40, 85, -2];
    var x = center[0];
    var y = center[1];
    var z = center[2];

    var x_targ, y_targ, z_targ;

    var speed = 150; //cuanto menos mas rapido


    var Thread = Java.type("java.lang.Thread");
    var myThread = Java.extend(Thread, {
        run: function () {
            var targ = npc.getAttackTarget();
            if (targ == null) { k.stop(); }

            var speedX = Math.abs(x - targ.x) / speed;
            var speedY = Math.abs(y - targ.y) / speed;
            var speedZ = Math.abs(z - targ.z) / speed;
            x_targ = targ.x;
            y_targ = 23;
            z_targ = targ.z;

            var alternar = true;

            for (var j = 0; j < 200; j++) {

                if (alternar == true) { npc.world.spawnParticle(particle1, x, y, z, 0, 0, 0, 0, 1) }
                else npc.world.spawnParticle(particle2, x, y, z, 0, 0, 0, 0, 1)
                alternar = !alternar;

                var enem = npc.world.getNearbyEntities(x, y, z, 0.2, 1);
                if (enem.length > 0) {
                    for (var v = 0; v < enem.length; v++) {
                        enem[v].damage(2);
                    }
                }

                if (x > x_targ) {
                    x -= speedX
                }
                if (y > y_targ) {
                    y -= speedY
                }
                if (z > z_targ) {
                    z -= speedZ
                }
                if (x < x_targ) {
                    x += speedX
                }
                if (y < y_targ) {
                    y += speedY
                }
                if (z < z_targ) {
                    z += speedZ
                }


                Thread.sleep(5);
            }
            //npc.executeCommand("/playsound customnpcs:songs.blast hostile @a -12 41 173 10") custom sound
        }
    });
    var t = new myThread();
    t.start();

}
function BestPlace2(e) {
    var npc = e.npc;
    var centro = [-40, 62, -2];
    var coorX = Math.floor(Math.random() * ((-30) - 30 + 1)) + 30;
    var coorZ = Math.floor(Math.random() * ((-30) - 30 + 1)) + 30;
    centro[0] = centro[0] + coorX;
    centro[2] = centro[2] + coorZ;
    return centro;

}

function animateSunParts(event, duration, particle) {


    //x y z son el punto de spawn de las partes del sol
    var npc = event.npc;
    var centro = [-40, 85, -2];

    var place = BestPlace2(event);
    var x = place[0];
    var y = place[1];
    var z = place[2];
    var dx, dy, dz;

    var speed = 150; //cuanto menos mas rapido
    var speedX = Math.abs(x - centro[0]) / speed;
    var speedY = Math.abs(y - centro[1]) / speed;
    var speedZ = Math.abs(z - centro[2]) / speed;
    var radio = 0.3;

    var Thread = Java.type("java.lang.Thread");
    var kamiThread = Java.extend(Thread, {
        run: function () {

            var targ = npc.getAttackTarget();
            if (targ == null) { k.stop(); }

            for (var j = 0; j < duration; j++) {
                for (var O = 0; O < Math.PI; O += 1) {
                    for (var T = 0; T < 2 * Math.PI; T += 1) {

                        dx = radio * Math.sin(O) * Math.cos(T);
                        dy = radio * Math.cos(O);
                        dz = radio * Math.sin(O) * Math.sin(T);
                        npc.world.spawnParticle(particle, x + dx, y + dy, z + dz, 0, 0, 0, 0, 1)

                    }
                    npc.world.spawnParticle(particle, x, y, z, 0.1, 0.1, 0.1, 0.2, 1)
                }

                if (x > centro[0]) {
                    x -= speedX
                }
                if (y > centro[1]) {
                    y -= speedY
                }
                if (z > centro[2]) {
                    z -= speedZ
                }
                if (x < centro[0]) {
                    x += speedX
                }
                if (y < centro[1]) {
                    y += speedY
                }
                if (z < centro[2]) {
                    z += speedZ
                }
                Thread.sleep(50);
            }

        }
    });
    var k = new kamiThread();
    k.start();



}
function Sun(npc, radius, duration, particle) {
    var O;
    var T;
    var x, y, z, dx, dy, dz;

    var center = [-40, 85, -2];
    x = center[0];
    y = center[1];
    z = center[2];

    var Thread = Java.type("java.lang.Thread");
    var kamiThread = Java.extend(Thread, {
        run: function () {

            var targ = npc.getAttackTarget();
            if (targ == null) { k.stop(); }

            for (var i = 0; i < duration; i++) {
                for (O = 0; O < Math.PI; O += 0.05) {
                    for (T = 0; T < 2 * Math.PI; T += 0.06) {


                        dx = radius * Math.sin(O) * Math.cos(T);
                        dy = radius * Math.cos(O);
                        dz = radius * Math.sin(O) * Math.sin(T);
                        npc.world.spawnParticle(particle, x + dx, y + dy, z + dz, 0.1, 0, 0.1, 0, 1)

                    }
                    npc.world.spawnParticle(particle, x, y, z, 0.1, 0.1, 0.1, 0.1, 1)
                }
                Thread.sleep(1000);
            }
        }
    });
    var H = new kamiThread();
    H.start();
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
                    for (var t = 0; t < targs.length; t++) {
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


function init(event){
    var npc = event.npc
    var storedData = npc.getStoreddata()
    storedData.put("attacking", "false")
    storedData.put("phase", 1)
    storedData.put("invulnerable", "false")
    var element = setElement(npc)
    npc.setHome(spawn.x, spawn.y, spawn.z)
    npc.setPosition(spawn.x, spawn.y, spawn.z)
    // npc.say("My Element is " + element)
    npc.timers.forceStart(1, AbilityAttemptTime * 20, true)
    npc.timers.forceStart(2, 30 * 20, true)
}