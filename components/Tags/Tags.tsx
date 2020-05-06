import React from 'react';
import { TagsProps } from '../types';

import styles from './Tags.module.css';
import Link from 'next/link';

function Tags(props: TagsProps) {
    const { tags } = props;

    const createTags = tags.map(tag => (
        <li key={tag.id} className={styles.tag}>
            <Link href={{ pathname: '/tags', query: { tag: tag.engName } }} as={`/tags/${ tag.engName }`}>
                <a className={styles.tag__link}>
                    {tag.name}
                </a>
            </Link>
        </li>
    ));

    return (
        <ul className={styles.tags}>
            {createTags}
        </ul>
    );
}

export default Tags;
