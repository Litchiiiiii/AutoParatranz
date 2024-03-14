const blacklistChapters = {
    goblins: '讨价还价',
    food: '幽灵厨房',
    mme: '魔法捣蛋鬼百货商店',
} // TODO 

onEvent('ftbquests.completed', (event) => {

    Object.entries(blacklistChapters).forEach(([key, value]) => {
        if (event.object.questChapter.title == value) return
    })

    const { object: quest } = event // object is the quest that was completed
    const { tags } = quest // tags is an array of strings that are the tags of the quest

    if (tags) {
        tags.forEach((tag) => {
            let classRoom
            let tp_loc
            switch (tag) {
                case 'bloodmagic':
                    classRoom = '血魔法'
                    break
                case 'botania':
                    classRoom = '植物魔法'
                    break
                case 'ars':
                    classRoom = '新生魔艺'
                    break
                case 'roots':
                    classRoom = "自然灵气与根源魔法"
                    break
                case 'hexerei':
                    classRoom = '魔法巫师'
                    break
                case 'occultism':
                    classRoom = '神秘学'
                    break
                case 'spellcasting':
                    classRoom = '施法'
                    break
                //case 'elemental':       classRoom = 'Elemental';break
                case 'beastmaster':
                    classRoom = '野兽大师'
                    break
                case 'bloodmagic_tp':
                    tp_loc = FTB_AI_CONSTS.tp.BloodMagic
                    break
                case 'botania_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Botania
                    break
                case 'ars_tp':
                    tp_loc = FTB_AI_CONSTS.tp.ArsNouveau
                    break
                case 'roots_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Roots
                    break
                case 'hexerei_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Hexerei
                    break
                case 'occultism_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Occultism
                    break
                case 'spellcasting_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Spellcasting
                    break
                case 'elemental_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Elemental
                    break
                case 'beastmaster_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Beastmaster
                    break
                case 'dorms_tp':
                    tp_loc = FTB_AI_CONSTS.tp.Dorms
                    break
                case 'dininghall_tp':
                    tp_loc = FTB_AI_CONSTS.tp.DiningHall
                    break
                case 'shop_one_tp':
                    tp_loc = FTB_AI_CONSTS.tp.shopTiers.one
                    break
                case 'shop_two_tp':
                    tp_loc = FTB_AI_CONSTS.tp.shopTiers.two
                    break
                case 'shop_three_tp':
                    tp_loc = FTB_AI_CONSTS.tp.shopTiers.three
                    break
                case 'shop_four_tp':
                    tp_loc = FTB_AI_CONSTS.tp.shopTiers.four
                    break
                case 'goblin_shop':
                    title(event.player.name.text, '欢迎')
                    subtitle(event.player.name.text, '来到哥布林商店')
                    break
                case 'mme_tp':
                    tp_loc = FTB_AI_CONSTS.tp.mme
                    break
                // case 'water': giveElementArmor(event.player, 'water')
            }

            if (classRoom) {
                let kuPlayer = new Ku.Player(event.player)
                kuPlayer.showActionBar(
                    `进入${classRoom}课程`,
                    Color.YELLOW,
                    false
                )
            }

            if (tp_loc) {
                let cmd = `execute as ${event.player.name.text} run playsound ftbai:arcanum_magic master @s ${event.player.x} ${event.player.y} ${event.player.z} 1 1`
                event.server.runCommandSilent(cmd)
                let player = event.player
                Utils.server.scheduleInTicks(20, () => {
                    teleport(player, tp_loc)
                })
            }
        })
    }
})