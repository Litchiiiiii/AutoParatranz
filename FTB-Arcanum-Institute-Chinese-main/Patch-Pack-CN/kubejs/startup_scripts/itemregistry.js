onEvent('item.registry', event => {
	// Register new items here
	event.create('ftbai:gold_coin').displayName('金币')
	event.create('ftbai:silver_coin').displayName('银币')
    event.create('ftbai:tuff_chunk').displayName('凝灰岩块')
    event.create('ftbai:andesite_chunk').displayName('安山岩块')
    event.create('ftbai:diorite_chunk').displayName('闪长岩块')
    event.create('ftbai:soil').displayName('土块')
    event.create('ftbai:lexxiegrimoire').displayName(`莱克西的魔法书`)
    event.create('ftbai:fools_gold_ingot').displayName('愚人金锭')
    event.create('ftbai:fools_gold_nugget').displayName('愚人金粒')
    event.create('ftbai:codex_bloodmagic', "music_disc").displayName(`血魔法典籍`).song('ftbai:saereth').analogOutput(2)
    event.create('ftbai:codex_arsnouveau', "music_disc").displayName(`新生魔艺典籍`).song('ftbai:r3gen').analogOutput(3)
    event.create('ftbai:codex_botania', "music_disc").displayName(`植物魔法典籍`).song('ftbai:ladymayhaem').analogOutput(4)
    event.create('ftbai:codex_evilcraft', "music_disc").displayName(`邪恶工艺典籍`).song('ftbai:aaronhowser1').analogOutput(5)
    event.create('ftbai:codex_hexcasting').displayName(`咒法学典籍`)
    event.create('ftbai:codex_malum', "music_disc").displayName(`灵灾典籍`).song('ftbai:loneztar').analogOutput(6)
    event.create('ftbai:codex_occultism', "music_disc").displayName(`神秘学典籍`).song('ftbai:everlipse').analogOutput(7)
    event.create('ftbai:codex_goblin', "music_disc").displayName(`哥布林卷轴`).song('ftbai:goblins').analogOutput(8)
    event.create('ftbai:codex_final', "music_disc").displayName(`终末秘典`).song('ftbai:backstory').analogOutput(9)
    event.create('ftbai:lexxies_charm', "music_disc").displayName(`莱克西的护身符`).song('ftbai:lady_lexxie').analogOutput(10)
    event.create('ftbai:wooden_bucket').displayName(`木桶`)
    event.create('ftbai:source_coal').displayName(`魔源炭`).burnTime(4800)

})


