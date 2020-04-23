import React from 'react';
import Link from 'next/link';


export default function Header() {
    return (
        <header>
            <Link href="/">
                <a className="header">
                    <img className="header__logo" src="/logo.svg" alt="TelltailGames" />
                    <h1 className="header__title">
                        <span className="header__title_color_pink">Telltail</span>
                        <span className="header__title_weight_light">Games</span>
                    </h1>
                </a>
            </Link>
        </header>
    );
}
