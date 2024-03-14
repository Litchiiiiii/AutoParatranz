const shopInfo = [
    'minecraft:raw_iron_block',
    'minecraft:raw_gold_block',
    'minecraft:raw_copper_block',
    'minecraft:budding_amethyst',
    'minecraft:totem_of_undying',
    'bloodmagic:sacrificialdagger',
    'bloodmagic:daggerofsacrifice',
    'bloodmagic:simplekey',
    'occultism:book_of_binding_foliot',
    'naturesaura:bottle_two_the_rebottling',
    'evilcraft:dark_ore',
    'eidolon:raw_lead_block',
    'eidolon:raw_silver_block',
]

const questRewards = [
    'ars_nouveau:novice_spell_book',
    'ars_nouveau:apprentice_spell_book',
    'ars_nouveau:archmage_spell_book',
    'ars_nouveau:glyph_craft',
    'ars_nouveau:source_berry',
    'ars_nouveau:glyph_harvest',
    'ars_nouveau:magebloom_crop',
]

const mobDropShop = [
    'minecraft:rotten_flesh',
    'minecraft:bone',
    'minecraft:gunpowder',
    'minecraft:spider_eye',
    'ars_nouveau:wilden_horn',
    'ars_nouveau:wilden_wing',
    'ars_nouveau:wilden_spike',
]

onEvent('jei.information', (event) => {
    event.add(
        ['ftbai:soil', 'botania:pebble'],
        '空手潜行右击泥土或草方块。'
    )

    event.add('botania:twig_wand', [
        '此魔杖可用于耕作：',
        '- 草方块',
        '- 泥土',
        '- 砂土',
        '- 缠根泥土',
    ])

    event.add('botania:dreamwood_wand', [
        '此魔杖可用于耕作3x3范围的：',
        '- 草方块',
        '- 泥土',
        '- 砂土',
        '- 缠根泥土',
    ])

    event.add(shopInfo, [
        '在其中一个哥布林商店可获得此物品！',
        ' ',
        '一定要全部找到！',
    ])

    event.add(questRewards, '作为任务奖励获得')

    event.add(mobDropShop, [
        '哥布林商店售卖传送门珍珠，可召唤多波次生物。',
        ' ',
        '这些生物会掉落所列物品！',
    ])
//courtyard TODO
    event.add(
        ['minecraft:shulker_shell'],
        [
            '魔法捣蛋鬼百货商店（位于庭院内）出售潜影贝传送门珍珠！',
            ' ',
            '使用后，会生成许多波潜影贝，会掉落潜影壳！',
        ]
    )

    event.add(
        'minecraft:iron_ore',
        '哥布林商店可以买到粗铁！'
    )
    event.add(
        'minecraft:copper_ore',
        '哥布林商店可以买到粗铜！'
    )
    event.add(
        'occultism:silver_ore',
        '哥布林商店可以买到粗银！'
    )

    event.add(
        'rootsclassic:dragons_eye',
        '紫颂花有10%概率掉落此物品'
    )

    event.add(
        [
            'minecraft:amethyst_shard',
            'hexcasting:amethyst_dust',
            'hexcasting:charged_amethyst',
        ],
        '掉落于在紫水晶母岩上生长的紫水晶簇'
    )

    event.add(
        'minecraft:glowstone_dust',
        '荧石块可通过凝矿兰或维度矿井获得'
    )

    event.add('minecraft:water_bucket', '咒法学章节包含获取水的方法')
    Object.entries(spirits).forEach(([spirit, mobs]) => {
        event.add(`malum:${spirit}_spirit`, `击杀\n\n${mobs.join('\n')}\n\n等获得`)
    })
})

onEvent('item.tooltip', (tooltip) => {
    tooltip.add(
        shopInfo,
        '哥布林商店中可获得此物品'
    )
    tooltip.add(
        'ftbai:wooden_bucket',
        '埃德木水桶的合成部件'
    )
})

const spirits = {
    wicked: ['僵尸', '苦力怕', '骷髅', '溺尸', '流浪者'],
    earthen: ['僵尸', '牛'],
    infernal: ['苦力怕', '烈焰人' ],
    arcane: ['苦力怕', '骷髅', '烈焰人', '末影人' ],
    sacred: ['牛', '蝙蝠', '所有被动动物'],
    aqueous: ['溺尸'],
    aerial: ['蝙蝠', '流浪者', '鸡'],
    eldritch: ['末影人']
}