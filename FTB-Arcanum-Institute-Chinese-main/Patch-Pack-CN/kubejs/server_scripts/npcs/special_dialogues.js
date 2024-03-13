const specialDialogues = {
    Fisherman: null,
    TheonlyTazz: '5A666790188D5ACA',
    梅希姆夫人: '4339E4F7236D2091',
    隆泽塔: '00894E8821E62449',
    瑞根: '0CF0DB4C6B3419C2',
    埃弗利普斯: `5195093F6886F0F3`,
    '亚伦·豪瑟': '458348F2C81B8D6B',
    苏卡尔: '6347557FC6E5D7D1',
    Jake_Evans: '60CB78F73F0B9016',
    萨拉斯: '0E0C6473FEBC9E99',
}

function isSpecialDialogue(name) {
    for (const [key, value] of Object.entries(specialDialogues)) {
        if (key == name) return true
    }

    return false
}

function doSpecialDialogue(event, name) {
    const { player } = event

    if (name == 'Fisherman') {
        fishermanDialog(event)
        return
    }

    let questId = specialDialogues[name]
    let gamestage = `spoken_to_${name}`

    if (!questId || player.stages.has(gamestage)) {
        npc.dialog(event, name, false)
        return
    }

    player.server.runCommandSilent(
        `execute as ${player.name.text} run ftbquests open_book ${questId}`
    )
    player.stages.add(gamestage)
}

function fishermanDialog(event) {
    const { player } = event

    if (player.stages.has('fairy_obtained')) {
        npc.dialog(event, 'Fisherman', false)
        return
    }

    player.tell(
        `<渔夫> 呦，${player.name.text}！你似乎遇到了很大的麻烦，但这是我力所能及的。`
    )

    player.stages.add('fairy_obtained')
    player.give('minecraft:totem_of_undying')

    player.persistentData.dialogueTimer = 2
}
