async function resetQuests() {
    fetch('/api/quests?limit=5&offset=0')
        .then(data => data.json())
        .then(quests => {
            questsElements.textContent = '';
            for (const quest of quests) {
                questsElements.appendChild(createQuest(quest));
            }

            state.finished = false;
            state.offset = 5;
            lastTitle = questsElements.lastElementChild.lastElementChild.firstElementChild;
            scrollObserver.observe(lastTitle);
        })
        .catch(() => createAlert('При загрузке квестов произошла ошибка. Попробуйте обновить страницу'));
}

async function fetchNextObservedQuests() {
    fetch(`/api/quests?limit=${state.limit}&offset=${state.offset}`)
        .then(data => data.json())
        .then(quests => {
            if (quests.length < 5) {
                state.finished = true;
            } else {
                state.offset += 5;
            }

            for (const quest of quests) {
                questsElements.appendChild(createQuest(quest));
            }

            lastTitle = questsElements.lastElementChild.lastElementChild.firstElementChild;
            scrollObserver.observe(lastTitle);
        })
        .catch(() => createAlert('При загрузке приключений произошла ошибка. Попробуйте обновить страницу'))
}
