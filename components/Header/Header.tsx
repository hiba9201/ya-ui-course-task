import React from 'react';
import Link from 'next/link';

import styles from './Header.module.css';


export default function Header() {
    return (
        <header className={styles.container}>
            <Link href="/">
                <a className={styles.header}>
                    <img className={styles.logo} src="/logo.svg" alt="TelltailGames" />
                    <h1 className={styles.title}>
                        <span className={styles.title_accent_color}>Telltail</span>
                        <span className={styles.title_weight_light}>Games</span>
                    </h1>
                </a>
            </Link>
        </header>
    );
}
