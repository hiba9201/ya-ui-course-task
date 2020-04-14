const questsElements = document.querySelector('#quests');
const tags = document.querySelectorAll('.tag__link');
const main = document.querySelector('main');

const state = {
    hasMore: true,
    offset: 5,
    limit: 5
};

fetch('/api/static')
    .then(path => path.json())
    .then(path => state.static = path.staticBasePath)
    .catch(() => state.static = '/');

window.addEventListener('popstate', async () => {
    if (!history.state) {
        const hashtag = document.getElementById('hashtag');
        if (hashtag) {
            main.removeChild(hashtag);
        }

        return await resetQuests();
    }

    const { engTag, ruTag } = history.state;
    createHashtag(ruTag);
    await updateTagQuests(engTag);
});
