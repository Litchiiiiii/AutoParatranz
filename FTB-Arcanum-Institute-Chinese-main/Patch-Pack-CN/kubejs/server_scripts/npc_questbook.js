onEvent('item.entity_interact', (event) => {
    const { player, target } = event

    let quest_page

    switch (target.name.text) {
        case '小幽灵': {
            quest_page = '6346217FB6A40402'
            break
        }
        case 'Goblin #1': {
            quest_page = '619CD05EC09EC8B4'
            break
        }
        case 'Goblin #2': {
            quest_page = '512C6E629FD19B23'
            break
        }
        case 'Goblin #3': {
            quest_page = '1CBE9AA80BBD1066'
            break
        }
        case 'Goblin #4': {
            quest_page = '79BE594F4EAE956B'
            break
        }
        case 'D_Collector':
        case 'knedlik_cz': {
            quest_page = '5DC8843A038909D7'
            break
        }
    }

    if (quest_page) {
        event.server.runCommandSilent(
            `execute as ${player.name.text} run ftbquests open_book ${quest_page}`
        )
    }
})
