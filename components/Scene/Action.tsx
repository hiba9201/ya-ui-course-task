import React from 'react';
import Link from 'next/link';

import { ActionData } from '../types';

import styles from './Action.module.css';


function Action(props: ActionData) {
    const { id, nextSceneId, text } = props;

    return (
        <li key={id} className={[styles.action, 'listStyle_none'].join(' ')}>
            <Link href={{ pathname: '/scene', query: { id: nextSceneId } }} as={`/scene/${nextSceneId}`}>
                <a className={['color_white', styles.button, 'a_no-decor'].join(' ')}>
                    {text}
                </a>
            </Link>
        </li>
    );
}

export default Action;
