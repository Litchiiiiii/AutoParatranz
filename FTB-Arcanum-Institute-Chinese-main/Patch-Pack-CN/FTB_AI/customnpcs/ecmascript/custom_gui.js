var Minecraft = Java.type("net.minecraft.client.Minecraft").m_91087_()
var Thread = Java.type("java.lang.Thread");
var assets_folder = "customnpcs\\assets\\customnpcs\\animations\\"
var animation_file = "animations.json"
var state = 0

function init(event){
    var npc = event.npc
}

function interact(event){

    var npc = event.npc

    var animation_list = [
        saved_poses_array.default, 
        saved_poses_array.hands_both_down, 
        saved_poses_array.hands_both_up, 
        saved_poses_array.hands_down, 
        saved_poses_array.hands_up,
        saved_poses_array.default
    ]

    // animateList(npc, animation_list)
    attack["fire"]["3"](event.npc)

    return
    var window = Minecraft.m_91268_()
    Gui.settings.width = window.m_85441_()
    Gui.settings.height = window.m_85442_()
    var gui = event.API.createCustomGui(1, Gui.settings.width, Gui.settings.height, false, event.player)


    loadMainMenu(event, gui)
    modifyMainMenu(event, gui)

    event.player.showCustomGui(gui)
}



// Variables
var Gui = {
    settings: {
        width: 960,
        height: 540,    
    },

    bodyParts: {
        id:1,
        x: 200,
        y: 150,
        width: 110,
        height: 92
    },
    files: {
        id: 5,
        x: 650,
        y: 265,
        width: 220,
        height: 150
    },
    poses: {
        id: 6,
        x: 200,
        y: 300,
        width: 110,
        height: 92
    },
    sliderX:{
        id:2,
        x: 960/2 - 100/2, //Gui.settings.width/2 - Gui.sliderX.width/2,
        y: 100, //Gui.settings.height -100,
        width: 200,
        height: 20,
        value: 180,
        maxValue: 360,
        minValue: 0
    },
    sliderY:{
        id:3,
        x: 960/2 - 100/2,
        y: 75, //Gui.settings.height - 75,
        width: 200,
        height: 20,
        value: 180,
        maxValue: 360,
        minValue: 0
    },
    sliderZ:{
        id:4,
        x: 960/2 - 100/2, //Gui.width/2 - Gui.sliderZ.width/2,
        y: 50, //Gui.settings.height - 50,
        width: 200,
        height: 20,
        value: 180,
        maxValue: 360,
        minValue: 0
    }
}
var GBody = Gui.bodyParts
var sliderX = Gui.sliderX
var sliderY = Gui.sliderY
var sliderZ = Gui.sliderZ  
var Poses = Gui.poses
var Files = Gui.files


var sliderX = Gui.sliderX
var sliderY = Gui.sliderY
var sliderZ = Gui.sliderZ 
var sliders = [sliderX, sliderY, sliderZ]
var easing = "none"
var animationDelay = 2
var animationResolution = 100
for(var i in sliders){
    sliders[i].x = Gui.settings.width/2 - sliders[i].width/2
    sliders[i].y = Gui.settings.height - sliders[i].y
}

var activeBodyPart = 0

var bodyParts = ["Head", "Left Arm", "Right Arm", "Body", "Left Leg", "Right Leg"]
var COLORS = {
    white: 16777215
}


// Menu Functions
function loadMainMenu(event, gui){
    var npc = event.npc

    for(var i in sliders){
        sliders[i].x = Gui.settings.width/2 - sliders[i].width/2
        sliders[i].y = Gui.settings.height/2 + Gui.settings.height/8 + (i*25)
    }
    //Initial Slider Settings
    sliderX.value = npc.getJob().getPart(0).getRotationX()
    sliderY.value = npc.getJob().getPart(0).getRotationY()
    sliderZ.value = npc.getJob().getPart(0).getRotationZ()

    //Initiate GUI Components
    GBody.x = Gui.settings.width/2 - Gui.settings.width/8
    GBody.y = Gui.settings.height/2 - Gui.settings.height/8
    var bodyScrollBar = gui.addScroll(GBody.id, GBody.x, GBody.y, GBody.width, GBody.height, bodyParts)
    var bodyResetAll = gui.addButton(GBody.id+100, "Reset All to Default", GBody.x, GBody.y-50, GBody.width, 20)
    var bodyReset = gui.addButton(GBody.id+200, "Reset to Default", GBody.x, GBody.y-25, GBody.width, 20)
    // Sliders
    gui.addLabel(sliderX.id+100, "X:", sliderX.x-10, sliderX.y+(sliderX.height/3), 10, 10, COLORS.white)  
    addSlider(gui, sliderX, function (gui, event){
        event.setFormat(event.getValue())
        sliderX.value = event.getValue()
        npc.getJob().getPart(activeBodyPart).setRotation(sliderX.value, sliderY.value, sliderZ.value)
        npc.updateClient()
        gui.update()
    })
    gui.addLabel(sliderY.id+100, "Y:", sliderY.x-10, sliderY.y+(sliderY.height/3), 10, 10, COLORS.white)  
    addSlider(gui, sliderY, function (gui, event){
        event.setFormat(event.getValue())
        sliderY.value = event.getValue()
        npc.getJob().getPart(activeBodyPart).setRotation(sliderX.value, sliderY.value, sliderZ.value)
        npc.updateClient()
        gui.update()
    })
    gui.addLabel(sliderZ.id+100, "Z:", sliderZ.x-10, sliderZ.y+(sliderX.height/3), 10, 10, COLORS.white)  
    addSlider(gui, sliderZ, function (gui, event){
        event.setFormat(event.getValue())
        sliderZ.value = event.getValue()
        npc.getJob().getPart(activeBodyPart).setRotation(sliderX.value, sliderY.value, sliderZ.value)
        npc.updateClient()
        gui.update()

    })
    // Poses
    // var Puppet = gui.addEntityDisplay(9999, Gui.settings.width/2, Gui.settings.height/2, npc).setScale(3)
    Poses.x = Gui.settings.width/2 - Gui.settings.width/8
    Poses.y = Gui.settings.height/2 + Gui.settings.height/100
    gui.addTextField(Poses.id+99, Poses.x, Poses.y-25, Poses.width, 20).setText(Object.keys(saved_poses_array)[0])
    var poseScroll = gui.addScroll(Poses.id, Poses.x, Poses.y, Poses.width, Poses.height, Object.keys(saved_poses_array))
    var poseSave = gui.addButton(Poses.id+100, "Save", Poses.x, Poses.y+Poses.height+5, Poses.width/2, 20)
    var poseLoad = gui.addButton(Poses.id+200, "Load", Poses.x + Poses.width/2, Poses.y+Poses.height+5, Poses.width/2, 20)
    var poseAnimate = gui.addButton(Poses.id+300, "Animate", Poses.x, Poses.y+Poses.height+30, Poses.width, 20)
    var poseEasing = gui.addScroll(Poses.id+400, Poses.x-Poses.width-25, GBody.y-25, Poses.width+20, Poses.height*3+25, Object.keys(Ease))
    // var poseDelayText = gui.addLabel(Poses.id+411, "Delay", Poses.x-Poses.width-10, Poses.y+Poses.height+5)
    var poseDelaySlider = gui.addSlider(Poses.id+410, Poses.x-Poses.width-5, Poses.y+Poses.height+5, Poses.width, 20, animationDelay)
                            .setMin(1)
                            .setMax(100)
                            .setValue(animationDelay)
                            .setOnChange(function (gui, event){
                                event.setFormat(event.getValue())
                                animationDelay = event.getValue()
                                npc.updateClient()
                                gui.update()
                            })
    var poseResolutionSlider = gui.addSlider(Poses.id+420, Poses.x-Poses.width-5, Poses.y+Poses.height+30, Poses.width, 20, animationResolution)
                            .setMin(1)
                            .setMax(500)
                            .setValue(animationResolution)
                            .setOnChange(function (gui, event){
                                event.setFormat(event.getValue())
                                animationResolution = event.getValue()
                                npc.updateClient()
                                gui.update()
                            })
    // Files
    Files.x = Gui.settings.width - Gui.settings.width/2.5
    Files.y = Gui.settings.height/2 - Gui.settings.height/8
    var fileExplorer = gui.addAssetsSelector(Files.id, Files.x, Files.y, Files.width, Files.height)
    var fileSave = gui.addButton(Files.id+1000, "Save", Files.x + Files.width/2, Files.y+Files.height+5, Files.width/2, 20)
    var fileLoad = gui.addButton(Files.id+2000, "Load", Files.x + Files.width/2, Files.y+Files.height+25, Files.width/2, 20)

}

function modifyMainMenu(event, gui){
    var npc = event.npc
    //Component Functions
    var bodyScrollBar = gui.getComponent(GBody.id)
    var bodyReset = gui.getComponent(GBody.id+200)
    var bodyResetAll = gui.getComponent(GBody.id+100)
    var poseSearchField = gui.getComponent(Poses.id+99)
    var poseScroll = gui.getComponent(Poses.id)
    var poseSave = gui.getComponent(Poses.id+100)
    var poseLoad = gui.getComponent(Poses.id+200)
    var poseAnimate = gui.getComponent(Poses.id+300)
    var poseEasing = gui.getComponent(Poses.id+400)
    var fileExplorer = gui.getComponent(Files.id)
    var fileSave = gui.getComponent(Files.id+1000)
    var fileLoad = gui.getComponent(Files.id+2000)

    // Bodyparts List
    bodyScrollBar.setDefaultSelection(activeBodyPart).setHasSearch(false).setOnClick(function(gui, event){
        setSliders(gui, npc)
        var activeBodyPart = event.getList()[event.getSelection()[0]]
        // setEasing(gui, activeBodyPart)
    })
    // Reset Buttons
    bodyReset.setOnPress(function(gui, event){
        activeBodyPart = bodyScrollBar.getSelection()[0]
        npc.getJob().getPart(activeBodyPart).setRotation(180, 180, 180)
        for(var i in sliders){
            gui.getComponent(sliders[i].id).setValue(180)
            gui.getComponent(sliders[i].id).setFormat(180)
            sliders[i].value = 180
            
        }
        gui.update()
        npc.updateClient()
    })
    bodyResetAll.setOnPress(function(gui, event){
        for(var i = 0; i < bodyParts.length; i++){
            npc.getJob().getPart(i).setRotation(180, 180, 180)
        }
        for(var i in sliders){
            gui.getComponent(sliders[i].id).setValue(180)
            gui.getComponent(sliders[i].id).setFormat(180)
            sliders[i].value = 180
            
        }
        gui.update()
            npc.updateClient()
    })
    // Poses
    poseScroll.setDefaultSelection(0).setHasSearch(false).setOnDoubleClick(function(gui, event){
            poseSearchField.setText(gui.getComponent(Poses.id).getSelectionList()[0])
            loadPose(gui, npc)
            setSliders(gui, npc)
            gui.update()
    })
    poseSave.setOnPress(function(gui, event){
            var poseName = poseSearchField.getText()
            var head = getRot(npc.getJob().getPart(0), 0)
            var body = getRot(npc.getJob().getPart(3), 3)
            var arm_left = getRot(npc.getJob().getPart(1), 1)
            var arm_right = getRot(npc.getJob().getPart(2), 2)
            var leg_left = getRot(npc.getJob().getPart(4), 4)
            var leg_right = getRot(npc.getJob().getPart(5), 5)

            var pose = {
                head: head,
                body: body,
                arm: {
                    left: arm_left,
                    right: arm_right
                },
                leg: {
                    left: leg_left,
                    right: leg_right
                },
            }
            saved_poses_array[poseName] = pose
            gui.getComponent(Poses.id).setList(Object.keys(saved_poses_array))
            log(poseName + ": " + JSON.stringify(pose,null, "\ "))
            gui.update()
    })
    poseLoad.setOnPress(function(gui, event){
            loadPose(gui, npc)
            setSliders(gui, npc)
    })
    poseAnimate.setOnPress(function(gui, event){
        var pose = gui.getComponent(Poses.id).getList()[gui.getComponent(Poses.id).getSelection()[0]]
        moveBody(npc, saved_poses_array[pose])
    })
    poseEasing.setDefaultSelection(0).setOnClick(function(gui, event){
        easing = poseEasing.getSelectionList()[0]
        var poseName = poseSearchField.getText()
        var activeBodyPart = getBodypart(gui)
        log(poseName)
        switch(activeBodyPart){
            case "Head": saved_poses_array[poseName].head.ease = easing; log(easing);break
            case "Left Arm": saved_poses_array[poseName].arm.left.ease = easing;break
            case "Right Arm": saved_poses_array[poseName].arm.right.ease = easing;break
            case "Body": saved_poses_array[poseName].body.ease = easing;break
            case "Left Leg": saved_poses_array[poseName].leg.left.ease = easing;break
            case "Right Leg": saved_poses_array[poseName].leg.right.ease = easing;break
            default: throw new Error("Invalid Active Body Part (POSINGEASING)"
            )
        }

    })

    // Files
    fileExplorer.setFileType("json").setRoot("animations")
    fileSave.setOnPress(function(gui, event){
        exportAnimation(gui, npc)
    })
    fileLoad.setOnPress(function(gui, event){
            var file = fileExplorer.getSelected()
            npc.say(file)
            var resultStr = [];
            var reader = null;
            reader = new java.io.BufferedReader(new java.io.FileReader(assets_folder+animation_file))
            var line;
            while ((line = reader.readLine()) != null) {
                resultStr.push(line);
                npc.say(line)
                saved_poses_array = line
            }

    })

}


// Functions
function loadPose(gui, npc){
    var poseName = gui.getComponent(Gui.poses.id).getSelectionList()[0]
    var pose = saved_poses_array[poseName]
    var puppet = npc.getJob()

    setRotation(npc, pose)

    animationDelay = 2
    gui.getComponent(Poses.id+410).setValue(animationDelay)
    animationResolution = 100
    gui.getComponent(Poses.id+420).setValue(animationResolution)
    easing = "none"
    var selectionIndex = Object.keys(Ease).indexOf(easing)
    // gui.getComponent(Poses.id+400).setSelection(selectionIndex)
    npc.updateClient()
    gui.update()
}

function loadPoseFile(gui, npc){
    loadAnimimations()
}


function setSliders(gui, npc){
    activeBodyPart = getBodypartId(gui)
    
    log(activeBodyPart)
    var rotation = getRot(npc.getJob().getPart(activeBodyPart))
    gui.getComponent(Gui.sliderX.id).setValue(rotation.x)
    gui.getComponent(Gui.sliderX.id).setFormat(rotation.x)
    gui.getComponent(Gui.sliderY.id).setValue(rotation.y)
    gui.getComponent(Gui.sliderY.id).setFormat(rotation.y)
    gui.getComponent(Gui.sliderZ.id).setValue(rotation.z)
    gui.getComponent(Gui.sliderZ.id).setFormat(rotation.z)
    gui.update()
}


function getRot(part, id){
    id = id || 0
    return {id: id, x: part.getRotationX(), y: part.getRotationY(), z: part.getRotationZ(), ease: "none", animationDelay:30, animationResolution:15}
}

function addSlider(gui, GuiComponent, f){
    gui.addSlider(GuiComponent.id, GuiComponent.x, GuiComponent.y, GuiComponent.width, GuiComponent.height, GuiComponent.value)
    .setMin(GuiComponent.minValue)
    .setMax(GuiComponent.maxValue)
    .setValue(GuiComponent.value)
    .setOnChange(f)
}

function animate(gui, npc){
    var poseName = gui.getComponent(Gui.poses.id).getSelectionList()[0]
    var destination = saved_poses_array[poseName]
    var head = getRot(npc.getJob().getPart(0), 0)
    var body = getRot(npc.getJob().getPart(3), 3)
    var arm_left = getRot(npc.getJob().getPart(1), 1)
    var arm_right = getRot(npc.getJob().getPart(2), 2)
    var leg_left = getRot(npc.getJob().getPart(4), 4)
    var leg_right = getRot(npc.getJob().getPart(5), 5)
    var origin = {
        head: head,
        body: body,
        arm: {
            left: arm_left,
            right: arm_right
        },
        leg: {
            left: leg_left,
            right: leg_right
        }  
    }
    moveBody(npc, origin, destination, animationResolution, animationDelay, Ease[easing])
}


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


function loadAnimimations(){
    var file = new java.io.File(animation_file)
    var fileReader = new java.io.FileReader(file)
    saved_poses_array = JSON.parse(fileReader)
    return saved_poses_array
}
function exportAnimation(gui, npc) {
    var head = getRot(npc.getJob().getPart(0), 0)
    var body = getRot(npc.getJob().getPart(3), 3)
    var arm_left = getRot(npc.getJob().getPart(1), 1)
    var arm_right = getRot(npc.getJob().getPart(2), 2)
    var leg_left = getRot(npc.getJob().getPart(4), 4)
    var leg_right = getRot(npc.getJob().getPart(5), 5)
    var pose = {
        head: head,
        body: body,
        arm: {
            left: arm_left,
            right: arm_right
        },
        leg: {
            left: leg_left,
            right: leg_right
        }  
    }
    var json = JSON.stringify(saved_poses_array)
    var editor_format = JSON.stringify(saved_poses_array)
    // json.replace(/\\"/g, "\uFFFF")
    // json = json.replace(/"([^"]+)":/g, '$1:').replace(/\uFFFF/g, '\\\"');
    var file_name = "test" //gui.getComponent(Files.id+1000).getText();
    if (file_name == null) {
        return
    } else {
        var file1 = new java.io.File(assets_folder+animation_file);
        var fileWriter = new java.io.FileWriter(file1)

        
        fileWriter.write(json)

        fileWriter.close();


        // fileWriter = new java.io.FileWriter("New World\\customnpcs\\scripts\\animations\\" + file_name + ".js");
        // fileWriter.write(json)
        // fileWriter.write("\n" + editor_format)
        // fileWriter.close();
    }
}


// GETTERS & SETTERS


function setRotation(npc, pose){
    var puppet = npc.getJob()
    puppet.getPart(0).setRotation(pose.head.x, pose.head.y, pose.head.z)
    puppet.getPart(1).setRotation(pose.arm.left.x, pose.arm.left.y, pose.arm.left.z)
    puppet.getPart(2).setRotation(pose.arm.right.x, pose.arm.right.y, pose.arm.right.z)
    puppet.getPart(3).setRotation(pose.body.x, pose.body.y, pose.body.z)
    puppet.getPart(4).setRotation(pose.leg.left.x, pose.leg.left.y, pose.leg.left.z)
    puppet.getPart(5).setRotation(pose.leg.right.x, pose.leg.right.y, pose.leg.right.z)
    
}

function setBodypart(event, bodyPart){}

function getBodypart(gui){
    return gui.getComponent(GBody.id).getList()[gui.getComponent(GBody.id).getSelection()[0]]
}
function getBodypartId(gui){
    return gui.getComponent(GBody.id).getSelection()[0]
}

function getPose(gui){
    var index = gui.getComponent(GBody.id).getSelection()[0]
    return gui.getComponent(Poses.id).getList()[index]
}

function getPartData(dict, part) {
    switch (part) {
        case "Head": return dict.head;
        case "Left Arm": return dict.arm.left;
        case "Right Arm": return dict.arm.right;
        case "Body": return dict.body.ease;
        case "Left Leg": return dict.leg.left;
        case "Right Leg": return dict.leg.right;
        default: throw new Error('Invalid part');
    }
}

function getActivePartData(gui) {
    var activeBodyPart = getBodypart(gui);
    var activePose = saved_poses_array[getPose(gui)];
    return getPartData(activePose, activeBodyPart);
}

function getEasing    (gui) { return getActivePartData(gui).ease; }
function getDelay     (gui) { return getActivePartData(gui).animationDelay; }
function getResolution(gui) { return getActivePartData(gui).animationResolution; }


function setBodypart(gui, bodypart){
    var id = bodyParts.indexOf(bodypart)
    gui.getComponent(GBody.id).setSelection(id)
}

function setEasing(gui, activeBodyPart){
    var activeEaseValue = getEasing(gui)
    var index = -1
    for(var i = 0; i < Object.keys(Ease).length; i++) {
        if (Ease[Object.keys(Ease)[i]] === activeEaseValue) {
            index = i
            break;
        }
    }
    log(index)
    log(gui.getComponent(Poses.id+400).setSelection(parseInt(index)))
    
}
function setdelay(gui, delay){
    var activePose = saved_poses_array[getPose(gui)]
    activePose.animationDelay = delay
}
function setResolution(gui, resolution){
    var activePose = saved_poses_array[getPose(gui)]
    activePose.animationResolution = resolution
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
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}



