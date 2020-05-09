import React from 'react';
import Head from 'next/head';

import Header from '../components/Header/Header';
import Quests from '../components/Quests/Quests';

function Index() {
    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8"/>
                <title>Telltail Games | Главная</title>
                <meta name="description" content="Awesome games"/>
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
            </Head>
            <Header />
            <Quests fetchLink='/api/quests' />
        </React.Fragment>
    );
}

export default Index;
