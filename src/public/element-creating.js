function createQuest(data) {
    const root = document.createElement('li');
    root.classList.add('quest');

    const questImageLink = document.createElement('a');
    questImageLink.classList.add('quest__image-link');
    questImageLink.setAttribute('href', `/scene/${data.startScene}`);

    const image = document.createElement('img');
    image.classList.add('quest__image');
    image.setAttribute('alt', data.name);
    image.setAttribute('src', data.image || `${state.static}default-quest-image.png`);

    questImageLink.appendChild(image);

    root.appendChild(questImageLink);

    const questInfo = document.createElement('div');
    questInfo.classList.add('quest__info');

    const title = document.createElement('a');
    title.classList.add('quest__title');
    title.setAttribute('href', `/scene/${data.startScene}`);
    title.innerText = data.name;

    questInfo.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('quest__description');
    description.innerText = data.description;

    questInfo.appendChild(description);

    const tags = document.createElement('ul');
    tags.classList.add('tags');

    for (const tag of data.tags) {
        tags.appendChild(createTag(tag));
    }

    questInfo.appendChild(tags);

    root.appendChild(questInfo);

    return root;
}

function createTag(data) {
    const root = document.createElement('li');
    root.classList.add('tag');

    const tagLink = document.createElement('a');
    tagLink.classList.add('tag__link');
    tagLink.setAttribute('href', `/tags/${data.engName}`);
    tagLink.innerText = data.name;

    root.appendChild(tagLink);

    addClickEventOnTag(tagLink);

    return root;
}

function createHashtag(ruName) {
    const hashtag = document.getElementById('hashtag');

    if (hashtag) {
        hashtag.innerText = ruName;
    } else {
        const tagTitle = document.createElement('h2');
        tagTitle.classList.add('hashtag');
        tagTitle.setAttribute('id', 'hashtag');
        tagTitle.innerText = ruName;

        main.insertBefore(tagTitle, questsElements);
    }
}

function createAlert(message) {
    const root = document.createElement('div');
    root.classList.add('modal');

    root.addEventListener('click', () => history.go());

    const alert = document.createElement('div');
    alert.classList.add('alert');

    const close = document.createElement('img');
    close.classList.add('alert__close-image');
    close.setAttribute('src', `${state.static}close.svg`);
    close.setAttribute('alt', 'Закрыть');

    close.addEventListener('click', () => history.go());

    const error = document.createElement('h4');
    error.classList.add('alert__error');
    error.innerText = 'О, нет! Что-то пошло не так :(';

    const text = document.createElement('p');
    text.classList.add('alert__text');
    text.innerText = message;

    alert.appendChild(close);
    alert.appendChild(error);
    alert.appendChild(text);

    root.appendChild(alert);

    main.appendChild(root);
}
