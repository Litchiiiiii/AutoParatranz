onEvent('item.tooltip', (event) => {
    event.addAdvanced('eccentrictome:tome', (item, advanced, text) => {
        eccentricTome(item, text)
    })

    event.add('minecraft:crafting_table', [
        Text.of('不可被放置！').red(),
        Text.of('换用魔符：合成').gray(),
    ])

    event.add('ars_nouveau:glyph_crush', [
        Text.of('用于方块，而不是物品').gray(),
    ])

    event.add('minecraft:gravel', [
        Text.of('由裂纹圆石转换').gray(),
        Text.of('灵火制造').gray(),
    ])

    event.add('forbidden_arcanus:eternal_stella', [Text.of('Do NOT apply to bloodmagic consumables.').red()])

    event.add([
        'minecraft:furnace',
        'minecraft:blast_furnace',
        'minecraft:smoker',
    ], [
        Text.of('不可被放置！').red(),
        Text.of('换用魔符：熔炼').gray(),
        Text.of('或植物学熔炉').gray()
    ])

    event.add(
        ['botania:black_lotus', 'botania:blacker_lotus'],
        Text.of('扔在有魔力的魔力池上！').gray()
    )

    event.add(/minecraft:.*_hoe/, [
        Text.of('配方已禁用！').red(),
        Text.of('换用精灵森林法杖（Wand of the Forest）！').gray(),
    ])
    event.add('minecraft:snow_block', [
        Text.of('用白雏菊转化').gray(),
        Text.of('水以获得').gray(),
    ])
    event.add(['ftbai:silver_coin', 'ftbai:gold_coin'], [
        Text.of('在哥布林商店出售').gray(),
        Text.of('生物掉落物以获得').green(),
    ])
})

function eccentricTome(item, text) {
    if (item.nbt['eccentrictome:mods'].toString() == '{}') {
        text.add(Component.string('将它与模组的书合成！').gray())
    } else {
        text.add(Component.string('左击以重置书').gray())
        text.add(Component.string('潜行移除书时会掉落。').gray())
    }
}
