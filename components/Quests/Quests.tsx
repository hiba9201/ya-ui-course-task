import React, { useEffect, useReducer, useState } from 'react';
import Quest from './Quest';

import { QuestProps } from '../types';

import styles from './Quest.module.css';
import Modal from '../Modal/Modal';

enum FetchActions {
    INCREASE_OFFSET,
    NO_MORE,
    ADD_QUESTS,
    CLEAR_QUESTS
}

interface FetchingState {
    quests: QuestProps[];
    limit: number;
    offset: number;
    hasMore: boolean;
}

function reducer(state: FetchingState, action: { type: FetchActions; quests?: QuestProps[] }) {
    switch (action.type) {
        case FetchActions.NO_MORE:
            return { ...state, hasMore: false };
        case FetchActions.INCREASE_OFFSET:
            return { ...state, offset: state.offset + state.limit };
        case FetchActions.ADD_QUESTS:
            return action.quests ? { ...state, quests: [...state.quests, ...action.quests] } : state;
        case FetchActions.CLEAR_QUESTS:
            return { ...state, quests: [] };
        default:
            throw new Error('Unknown action type!');
    }
}

function Quests(props: { fetchLink: string; tag?: string }) {
    const { fetchLink, tag } = props;

    const [ fetching, setFetching ] = useState(true);
    const [ ruTag, setRuTag ] = useState(null);
    const [ error, setError ] = useState('');

    const [ state, dispatch ] = useReducer(reducer, {
        quests: [],
        limit: 5,
        offset: 0,
        hasMore: true
    });

    function handleScroll(entry: IntersectionObserverEntry, unobserve: () => void) {
        if (state.hasMore && entry.isIntersecting) {
            unobserve();
            setFetching(true);
        }
    }

    const options = {
        onChange: handleScroll,
        threshold: 1
    };

    useEffect(() => {
        if (!tag) {
            return;
        }

        async function fetchTag() {
            const receivedTag = await fetch(`/api/rutag/${tag}`);
            if (receivedTag.status !== 200) {
                setRuTag(null);
                setError(receivedTag.statusText);
            } else {
                const tagJson = await receivedTag.json();
                setRuTag(tagJson.ruTag);
            }
        }

        fetchTag();

        dispatch({ type: FetchActions.CLEAR_QUESTS });
        setFetching(true);
    }, [tag]);

    useEffect(() => {
        if (!fetching) {
            return;
        }

        async function fetchQuests() {
            const receivedQuests = await fetch(`${fetchLink}?limit=${state.limit}&offset=${state.offset}`);
            if (receivedQuests.status !== 200) {
                setError(receivedQuests.statusText);
                dispatch({ type: FetchActions.CLEAR_QUESTS });
            } else {
                const questsJson = await receivedQuests.json();
                dispatch({ type: FetchActions.ADD_QUESTS, quests: questsJson });

                if (questsJson.length < state.limit) {
                    dispatch({ type: FetchActions.NO_MORE });
                } else {
                    dispatch({ type: FetchActions.INCREASE_OFFSET });
                }
            }
        }

        fetchQuests();
        setFetching(false);
    }, [fetching]);

    return (
        <main>
            {error && <Modal message={error}/>}
            {tag && ruTag && <h2 className={styles.hashtag}>{ ruTag }</h2>}
            {fetching || state.quests.length !== 0 ? (
                <ul id="quests" className={styles.quests}>
                    {state.quests.map((quest, idx) => {
                        return idx === state.quests.length - 1 ? (
                            <Quest {...quest} key={quest.id} options={options} />
                        ) : (<Quest {...quest} key={quest.id} />);
                    })}
                </ul>
            ) : <p className={styles.title}>Нет доступных квестов</p>
            }
        </main>
    );
}

export default Quests;
