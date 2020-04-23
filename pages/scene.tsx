import React from 'react';
import Head from 'next/head';

import Header from '../components/Header/Header';
import Scene from '../components/Scene/Scene';

function SceneMain(props: { sceneId: string } ) {
    const { sceneId } = props;

    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8"/>
                <title>Telltail Games | Сцена</title>
                <meta name="description" content="Awesome games"/>
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
            </Head>
            <Header />
            <Scene id={ sceneId } />
        </React.Fragment>
    );
}

SceneMain.getInitialProps = async function({ req, query }: any) {
    const sceneId = req ?
        req.params.id :
        query.id;

    return {
        sceneId
    };
};


export default SceneMain;
