import React from 'react';
import Link from 'next/link';

import { ActionData } from '../types';

import styles from './Scene.module.css';


function Action(props: ActionData) {
    const { id, nextSceneId, text } = props;

    return (
        <li key={id} className={[styles.action, styles.listStyle_none].join(' ')}>
            <Link href={{ pathname: '/scene', query: { id: nextSceneId } }} as={`/scene/${nextSceneId}`}>
                <a className={[styles.color_white, styles.button, styles.a_noDecor].join(' ')}>
                    {text}
                </a>
            </Link>
        </li>
    );
}

export default Action;
