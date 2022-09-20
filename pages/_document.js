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
				<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
				<script
					dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
					page_path: window.location.pathname,
					});
				`,
					}}
				/>

					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="application-name" content="Fluorite" />
					<meta name="apple-mobile-web-app-title" content="Fluorite" />

					<link rel="manifest" href="/manifest.json" />
					<meta name="theme-color" content="#FFFFFF" />
					<meta name="msapplication-navbutton-color" content="#FFFFFF" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
					<meta name="msapplication-starturl" content="/" />
					
					<link rel="icon" href="/static/icons/icon-192x192.png" />
					<link rel="apple-touch-icon" href="/static/icons/icon-192x192.png" />
					<link rel="icon" sizes="256x256" href="/static/icons/icon-256x256.png" />
					<link rel="apple-touch-icon" sizes="256x256" href="/static/icons/icon-256x256.png" />
					<link rel="icon" sizes="384x384" href="/static/icons/icon-384x384.png" />
					<link rel="apple-touch-icon" sizes="384x384" href="/static/icons/icon-384x384.png" />
					<link rel="icon" sizes="512x512" href="/static/icons/icon-512x512.png" />
					<link rel="apple-touch-icon" sizes="512x512" href="/static/icons/icon-512x512.png" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,1,200" />
					<link href="https://fonts.googleapis.com/css2?family=Reem+Kufi+Ink&family=Inria+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
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