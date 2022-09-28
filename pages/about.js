import Head from 'next/head'
import Link from 'next/link'
import Layout, { Page as ContentPage, Main, Breadcumbs, ViewBlock } from '../components/layout'

export default function Page() {
	return (
		<Main>
			<Head>
				<title>Sobre • Biblioteca de Tóquio</title>
			</Head>
			<ViewBlock.Header title={ "Sobre a Biblioteca de Tóquio" }/>
			<Breadcumbs data={ [ { text: "Início", href: "/" }, { text: "Sobre", active: true } ] } />
			<ContentPage.Description>
				<div style={{ maxWidth: "600px" }}>
					<p>Meu nome é Willian e eu estou criando esse WebApp que estou chamando de <em>Biblioteca de Tóquio</em> e estou criando isso inicialmente para uso pessoal junto com meus amigos em uma futura campanha de 3D&T.</p>
					<p>Inicalmente o que temos são Vantagens e Desvantagens de <Link href="/content"><a>alguns livros</a></Link> e uma ferramenta que permite a  <Link href="/search"><a>busca</a></Link>.</p>
					<p>Ainda estou desenvolvendo tudo, mas futuramente ainda quero permitir:</p>
					<ul>
						<li><strong>Novos conteúdos</strong>: A ideia é incluir as vantagens únicas, kits, magias, perícias e muitas outras coisas, transformando isso numa grande base de dados, permitindo campanhas mais flúidas e dinâmicas.</li>
						<li><strong>Ficha de personagens</strong>: Permitir a criação de fichas de personagem usando como base todo o conteúdo cadastrado aqui. Além de realizar os calculos automáticos de atributos, bônus e outras.</li>
						<li><strong>Campanha</strong>: Permitir que mestres criem campanhas, dando acesso a jogadores para incluirem seus personagens nela. Além disso quero permitir  registro de notas da campanha, tanto para o mestre como para os jogadores.</li>
						<li><strong>Rolagem de dados</strong>: E claro, se ja tem tanta coisa, porque não permitir a rolagem de dados também?</li>
					</ul>
					<p>Agora foi criado um <a target="_blank" href="https://discord.gg/vq5zphGpM4">Canal do Discord</a> pra falar sobre updates e falar sobre o App.</p>
					<p>Se você gostou do projeto e quer dar alguma sugestão (ou até ajudar 😃) pode mandar DM no  <a rel="noreferrer" target="_blank" href="https://instagram.com/wlln.rds">instagram</a> ou me chama no <a rel="noreferrer" target="_blank" href="https://twitter.com/walmeidaw">Twitter</a>.</p>
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