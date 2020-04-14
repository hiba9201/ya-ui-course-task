async function resetQuests() {
    let quests;
    try {
        quests = await fetch('/api/quests?limit=5&offset=0')
    } catch (e) {
        return createAlert('При загрузке приключений произошла ошибка. Попробуйте обновить страницу');
    }
    const jsonQuests = await quests.json();

    questsElements.textContent = '';
    for (const quest of jsonQuests) {
        questsElements.appendChild(createQuest(quest));
    }

    state.offset = jsonQuests.length;
    state.hasMore = jsonQuests.length === state.limit;
    lastTitle = getLastTitle();
    scrollObserver.observe(lastTitle);
}

async function fetchNextObservedQuests() {
    let quests;
    try {
        quests = await fetch(`/api/quests?limit=${state.limit}&offset=${state.offset}`);
    } catch (e) {
        return createAlert('При загрузке приключений произошла ошибка. Попробуйте обновить страницу');
    }
    const jsonQuests = await quests.json();

    if (jsonQuests.length < state.limit) {
        state.hasMore = false;
    } else {
        state.offset += 5;
    }

    for (const quest of jsonQuests) {
        questsElements.appendChild(createQuest(quest));
    }

    lastTitle = getLastTitle();
    scrollObserver.observe(lastTitle);
}

function getLastTitle() {
    return questsElements.querySelector('.quest:last-child .quest__title');
}
