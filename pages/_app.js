import '../styles/globals.scss'
import Script from 'next/script'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return <>
    <Head>
      <title>Biblioteca de Tóquia</title>
      <meta name="description" content="3D&T Companion" />
      <link rel="icon" href="/favicon.ico" />
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
    </Head>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-QXSKKLN5JW" strategy="afterInteractive"></Script>
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QXSKKLN5JW');
        `}
      </Script>
    {getLayout(<Component {...pageProps} />)}
  </>
}

export default MyApp
