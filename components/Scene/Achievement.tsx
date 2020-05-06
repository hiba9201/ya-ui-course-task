import React from 'react';

import { AchievementData } from '../types';

import styles from './Achievement.module.css';


function Achievement(props: AchievementData) {
    const { id, image, description } = props;

    return (
        <li key={id} className={[styles.achievement, 'listStyle_none'].join(' ')}>
            <img className={styles.image} src={image} alt="Достижение"/>
            <div className={styles.info}>
                <p className={[styles.notify, 'margin_none'].join(' ')}>
                    Достижение получено
                </p>
                <p className={[styles.text, 'margin_none'].join(' ')}>
                    {description}
                </p>
            </div>
        </li>
    );
}

export default Achievement;
