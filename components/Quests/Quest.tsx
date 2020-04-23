import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import Link from 'next/link';

import Tags from '../Tags/Tags';

import { QuestProps } from '../types';
import styles from './Quest.module.css';


function Quest(props: QuestProps) {
    const { startScene, image, name, description, tags, options } = props;

    return (
        <li className={ styles.quest }>
            <Link href={{ pathname: '/scene', query: { id: startScene } }}
                  as={`/scene/${ startScene }`}>
                <a className={ styles['image-link'] }>
                    {image ?
                        <img className={ styles.image } src={ image } alt={ name } /> :
                        <img className={ styles.image } src='/default-quest-image.png' alt={ name } />}
                </a>
            </Link>
            <div className={ styles.info }>
                {options ? (
                    <Observer {...options}>
                        <Link href={{ pathname: '/scene', query: { id: startScene } }}
                              as={`/scene/${ startScene }`}>
                            <a className={ styles.title }>
                                { name }
                            </a>
                        </Link>
                    </Observer>
                ) : (
                    <Link href={{ pathname: '/scene', query: { id: startScene } }}
                          as={`/scene/${ startScene }`}>
                        <a className={ styles.title }>
                            { name }
                        </a>
                    </Link>
                )}

                <p className={ styles.description }>{ description }</p>
                <Tags tags={ tags } />
            </div>
        </li>
    );
}


export default Quest;
