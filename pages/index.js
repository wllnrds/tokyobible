import Head from 'next/head'
import Link from 'next/link'
import Layout, { Page as ContentPage, Main, Breadcumbs, ViewBlock, Caption } from '../components/layout'

export default function Page() {
	return (
		<Main>
			<Head>
				<title>Biblioteca de Tóquio</title>
			</Head>
			<ViewBlock.Header title={ "Oi!" }/>
			<Breadcumbs data={ [ { text: "Início", active: true } ] } />
			<ContentPage.Description>
				<div style={{ maxWidth: "600px" }}>
					<p>Tamo trabalhando nessa página ainda...</p>
				</div>
			</ContentPage.Description>
			<ContentPage.Description>
				<div style={{ maxWidth: "600px" }}>
					<Caption>Informe</Caption>
					<p><strong>3D&T</strong> e a <Link href={"https://apoia.se/dragaobrasil"}>Revista Dragão Brasil</Link> são produzidos pela <Link href={"https://www.jamboeditora.com.br"}>Jambô Editora</Link>. </p>
				</div>
			</ContentPage.Description>
		</Main>
	)
}


Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}