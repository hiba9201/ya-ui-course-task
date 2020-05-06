import React, { useEffect, useReducer, useState } from 'react';
import Quest from './Quest';

import { QuestProps } from '../types';

import styles from './Quest.module.css';
import Modal from '../Modal/Modal';

enum FetchActions {
    FETCH_MORE,
    NO_MORE
}

interface FetchingState {
    limit: number;
    offset: number;
    hasMore: boolean;
}

function reducer(state: FetchingState, action: { type: FetchActions }) {
    switch (action.type) {
        case FetchActions.NO_MORE:
            return { ...state, hasMore: false };
        case FetchActions.FETCH_MORE:
            return { ...state, offset: state.offset + state.limit };
        default:
            throw new Error('Unknown action type!');
    }
}

function Quests(props: { fetchLink: string; tag?: string }) {
    const { fetchLink, tag } = props;

    const [ quests, setQuests ] = useState<QuestProps[]>([]);
    const [ fetching, setFetching ] = useState(true);
    const [ ruTag, setRuTag ] = useState(null);
    const [ error, setError ] = useState('');

    const [ state, dispatch ] = useReducer(reducer, {
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

        fetch(`/api/rutag/${tag}`)
            .then(tag => {
                if (tag.status !== 200) {
                    setError(tag.statusText);
                }

                return tag.json();
            })
            .then(tag => setRuTag(tag.ruTag))
            .catch(() => setRuTag(null))
            .finally(() => {
                setQuests([]);
                setFetching(true);
            });
    }, [tag]);

    useEffect(() => {
        if (!fetching) {
            return;
        }

        fetch(`${fetchLink}?limit=${state.limit}&offset=${state.offset}`)
            .then(quests => {
                if (quests.status !== 200) {
                    setError(quests.statusText);
                }

                return quests.json();
            })
            .then(questsData => {
                setQuests(prevQuests => [...prevQuests, ...questsData]);

                if (questsData.length < state.limit) {
                    dispatch({ type: FetchActions.NO_MORE });
                } else {
                    dispatch({ type: FetchActions.FETCH_MORE });
                }
            }, () => setQuests([]))
            .finally(() => setFetching(false));
    }, [fetching]);

    return (
        <main>
            {error && <Modal message={error}/>}
            {tag && ruTag && <h2 className={styles.hashtag}>{ ruTag }</h2>}
            {fetching || quests.length !== 0 ? (
                <ul id="quests" className={styles.quests}>
                    {quests.map((quest, idx) => {
                        return idx === quests.length - 1 ? (
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
