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

        async function fetchScene() {
            const receivedScene = await fetch(`/api/scene/${id}`);
            if (receivedScene.status !== 200) {
                setError(receivedScene.statusText);
                setScene(new SceneJson());
            } else {
                setScene(await receivedScene.json());
            }
            setFetching(false);
        }

        fetchScene();
    }, [id]);

    return (
        <main className={styles.scene}>
            {error && <Modal message={error}/>}
            {!fetching && sceneData.scene && (
                <>
                    <div className={styles.description}>
                        {sceneData.scene.image ? (
                            <>
                                <img className={styles.image} src={sceneData.scene.image} alt="Сцена"/>
                                <p className={[styles[`text_${sceneData.scene.angle}`],
                                    styles.text, 'color_white margin_none'].join(' ')}>
                                    {sceneData.scene.description}
                                </p>
                            </>
                        ) : (
                            <p className={[styles['text_left-up'], styles.text,
                                'color_black margin_none'].join(' ')}>
                                {sceneData.scene.description}
                            </p>
                        )}
                    </div>
                    <ul className={'padding_none'}>
                        {sceneData.scene.achievements.map(achievement => <Achievement { ...achievement }/>)}
                    </ul>
                    <ul className={[styles.actions, 'text-align_center padding_none'].join(' ')}>
                        {sceneData.scene.actions.length ? (
                            <>
                                {sceneData.scene.actions.map(action => <Action {...action} />)}
                            </>
                        ) : (
                            <Action id={1} nextSceneId={sceneData.startSceneId} text='Начать заново' />
                        )}
                    </ul>
                </>
            )}
            {!fetching && !sceneData.scene && (
                <p className={styles.text}>Сцены не будет :(</p>
            )}
            {fetching && (
                <p>Загрузка...</p>
            )}
        </main>
    );
}


export default Scene;
