import React from 'react';
import Head from 'next/head';

import Header from '../components/Header/Header';
import Quests from '../components/Quests/Quests';

function TagMain(props: { tag: string } ) {
    const { tag } = props;

    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8"/>
                <title>Telltail Games | Квесты</title>
                <meta name="description" content="Awesome games"/>
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
            </Head>
            <Header />
            <Quests fetchLink={`/api/quests/${tag}`} tag={ tag } />
        </React.Fragment>
    );
}

TagMain.getInitialProps = async function({ req, query }: any) {
    const tag = req ?
        req.params.tag :
        query.tag;

    return {
        tag,
    };
};


export default TagMain;
