async function updateTagQuests(engName) {
    let res;
    try {
        res = await fetch(`/api/quests/${engName}`);
    } catch (e) {
        return createAlert('При загрузке квестов произошла ошибка. Попробуйте обновить страницу');
    }

    const quests = await res.json();
    questsElements.textContent = '';

    for (const quest of quests) {
        questsElements.appendChild(createQuest(quest));
    }
}

function addClickEventOnTag(tag) {
    tag.addEventListener('click', async event => {
        event.preventDefault();

        const tag = event.target;

        const tagLink = tag.getAttribute('href');
        const engName = tagLink.replace('/tags/', '');

        if (!history.state || history.state.engTag !== engName) {
            history.pushState(history.state, '', window.location.href);
            history.replaceState({ engTag: engName, ruTag: tag.innerText }, '', tagLink);

            createHashtag(tag.innerText);

            await updateTagQuests(engName);
        }
    });
}

for (const tag of tags) {
    addClickEventOnTag(tag);
}
