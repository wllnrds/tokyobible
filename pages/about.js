import Head from 'next/head'
import Link from 'next/link'
import Layout, { Page as ContentPage, Main, Breadcumbs, ViewBlock, Caption } from '../components/layout'

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
					<Caption>Informe</Caption>
					<p><strong>3D&T</strong> e a <Link href={"https://apoia.se/dragaobrasil"}>Revista Dragão Brasil</Link> são produzidos pela <Link href={"https://www.jamboeditora.com.br"}>Jambô Editora</Link>. </p>
				</div>
			</ContentPage.Description>
			<ContentPage.Description>
				<div style={{ maxWidth: "600px" }}>
					<Caption>Sobre o projeto</Caption>
					<p>Meu nome é Willian e eu estou criando esse WebApp que estou chamando de <em>Biblioteca de Tóquio</em> e estou criando isso inicialmente para uso pessoal junto com meus amigos em uma futura campanha de 3D&T.</p>
					<p>Inicalmente o que temos são Vantagens e Desvantagens de <Link href="/content">alguns livros</Link> e uma ferramenta que permite a  <Link href="/search">busca</Link>.</p>
					<p>Ainda estou desenvolvendo tudo, mas futuramente ainda quero permitir:</p>
					<ul>
						<li><strong>Novos conteúdos</strong>: A ideia é incluir as vantagens únicas, kits, magias, perícias e muitas outras coisas, transformando isso numa grande base de dados, permitindo campanhas mais flúidas e dinâmicas.</li>
						<li><strong>Ficha de personagens</strong>: Permitir a criação de fichas de personagem usando como base todo o conteúdo cadastrado aqui. Além de realizar os calculos automáticos de atributos, bônus e outras.</li>
						<li><strong>Campanha</strong>: Permitir que mestres criem campanhas, dando acesso a jogadores para incluirem seus personagens nela. Além disso quero permitir  registro de notas da campanha, tanto para o mestre como para os jogadores.</li>
						<li><strong>Rolagem de dados</strong>: E claro, se ja tem tanta coisa, porque não permitir a rolagem de dados também?</li>
					</ul>
					<p>Agora foi criado um <Link href={'https://discord.gg/vq5zphGpM4'} target="_blank">Canal do Discord</Link> pra falar sobre updates e falar sobre o App.</p>
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