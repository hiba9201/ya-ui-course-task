import React from 'react';

import { AchievementData } from '../types';

import styles from './Scene.module.css';


function Achievement(props: AchievementData) {
    const { id, image, description } = props;

    return (
        <li key={id}
            className={[styles.achievement, styles.listStyle_none].join(' ')}>
            <img className={styles.achievementImage} src={image} alt="Достижение"/>
            <div className={styles.achievementInfo}>
                <p className={[styles.achievementNotify, styles.margin_none].join(' ')}>
                    Достижение получено
                </p>
                <p className={[styles.achievementText, styles.margin_none].join(' ')}>
                    {description}
                </p>
            </div>
        </li>
    );
}

export default Achievement;
