import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="pt-BR">
				<Head>
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="application-name" content="Biblioteca de Tóquio" />
					<meta name="apple-mobile-web-app-title" content="Biblioteca de Tóquio" />

					<link rel="manifest" href="/manifest.json" />
					<meta name="theme-color" content="#FFFFFF" />
					<meta name="msapplication-navbutton-color" content="#FFFFFF" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
					<meta name="msapplication-starturl" content="/" />
					
					<link rel="icon" href="/static/images/icons/icon-192x192.png" />
					<link rel="apple-touch-icon" href="/static/images/icons/icon-192x192.png" />
					<link rel="icon" sizes="256x256" href="/static/images/icons/icon-256x256.png" />
					<link rel="apple-touch-icon" sizes="256x256" href="/static/images/icons/icon-256x256.png" />
					<link rel="icon" sizes="384x384" href="/static/images/icons/icon-384x384.png" />
					<link rel="apple-touch-icon" sizes="384x384" href="/static/images/icons/icon-384x384.png" />
					<link rel="icon" sizes="512x512" href="/static/images/icons/icon-512x512.png" />
					<link rel="apple-touch-icon" sizes="512x512" href="/static/images/icons/icon-512x512.png" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,1,200&display=optional" />
					<link href="https://fonts.googleapis.com/css2?family=Reem+Kufi+Ink&display=optional&family=Inria+Sans:wght@300;400;700&display=optional" rel="stylesheet" />
        		</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument