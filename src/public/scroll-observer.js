let lastTitle;
try {
    lastTitle = questsElements.lastElementChild.lastElementChild.firstElementChild;
} catch (e) {}



async function handleScroll() {
    scrollObserver.unobserve(lastTitle);

    await fetchNextObservedQuests();
}

const scrollObserver = new IntersectionObserver(async entries => {
    if (!state.finished && entries[0].isIntersecting) {
        await handleScroll();
    }
}, {
    threshold: 1
});

if (lastTitle) {
    scrollObserver.observe(lastTitle);
}
