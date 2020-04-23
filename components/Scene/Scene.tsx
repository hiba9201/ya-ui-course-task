import React, { useEffect, useState } from 'react';

import { SceneProps, SceneJson } from '../types';
import styles from './Scene.module.css';
import Modal from '../Modal/Modal';
import Achievement from './Achievement';
import Action from './Action';


function Scene(props: SceneProps) {
    const { id } = props;

    const [sceneData, setScene] = useState(new SceneJson());
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setFetching(true);
        fetch(`/api/scene/${id}`)
            .then(scene => {
                if (scene.status !== 200) {
                    setError(scene.statusText);
                }

                return scene.json();
            })
            .then(scene => setScene(scene), () => setScene(new SceneJson()))
            .finally(() => setFetching(false));
    }, [id]);

    return (
        <main className={styles.scene}>
            {error && <Modal message={error}/>}
            {!fetching ? sceneData.scene ? (
                <>
                    <div className={styles.description}>
                        {sceneData.scene.image ? (
                            <>
                                <img className={styles.image} src={sceneData.scene.image} alt="Сцена"/>
                                <p className={[styles[`text_${sceneData.scene.angle}`],
                                    styles.text, styles.color_white, styles.margin_none].join(' ')}>
                                    {sceneData.scene.description}
                                </p>
                            </>
                        ) : (
                            <p className={[styles['text_left-up'], styles.text,
                                styles.color_black, styles.margin_none].join(' ')}>
                                {sceneData.scene.description}
                            </p>
                        )}
                    </div>
                    <ul className={[styles.achievements, styles.padding_none].join(' ')}>
                        {sceneData.scene.achievements.map(achievement => <Achievement {...achievement}/>)}
                    </ul>
                    <ul className={[styles.actions, styles.textAlign_center, styles.padding_none].join(' ')}>
                        {sceneData.scene.actions.length ? (
                            <>
                                {sceneData.scene.actions.map(action => <Action {...action} />)}
                            </>
                        ) : (
                            <Action id={1} nextSceneId={sceneData.startSceneId} text='Начать заново' />
                        )}
                    </ul>
                </>
            ) : (
                <p className={styles.text}>Сцены не будет :(</p>
            ) : (
                <p>Загрузка...</p>
            )}
        </main>
    );
}


export default Scene;
