import { GoogleAnalytics } from "nextjs-google-analytics";
import Head from 'next/head'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)
    return <>
        <GoogleAnalytics trackPageViews />
        <Head>
            <title>Biblioteca de Tóquio</title>
            <meta name="description" content="3D&T Companion" />
            <link rel="icon" href="/favicon.ico" />
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        </Head>
        {getLayout(<Component {...pageProps} />)}
    </>
}

export default MyApp
