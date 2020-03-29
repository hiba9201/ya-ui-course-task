async function updateTagQuests(engName) {
    fetch(`/api/quests/${engName}`)
        .then(data => data.json())
        .then(quests => {
            questsElements.textContent = '';

            for (const quest of quests) {
                questsElements.appendChild(createQuest(quest));
            }
        })
        .catch(() => createAlert('При загрузке квестов произошла ошибка. Попробуйте обновить страницу'));
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
