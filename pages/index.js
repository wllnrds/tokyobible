import Head from 'next/head'
import Link from 'next/link'
import Layout, { Page as ContentPage, Main, Breadcumbs, ViewBlock } from '../components/layout'

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