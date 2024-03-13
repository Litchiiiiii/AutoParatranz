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