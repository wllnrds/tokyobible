import groq from 'groq'
import Head from 'next/head'
import Link from 'next/link'

import client from '../../client'
import Layout, { Page as ContentPage, Main, Caption, Breadcumbs } from '../../components/layout'

function countRules(data = []){
	const counter = data.map( item => (item.group)? item.group : item.name )
	const list = data.map( item => ( {
		name: (item.group)? `${item.group} :: ${item.name}` : item.name,
		path: `${ item.type_slug }/${ item.slug }`
	} ) )
	const setCounter = new Set(counter)
	return {
		counter: setCounter.size,
		list
	};
}

export default function Page({ data }) {
	const vantagem = countRules( data ? data.vantagem : []);
	const desvantagem = countRules( data ? data.desvantagem : [] );

	return (
		data && <>
            <Head>
                <title>{ data.type.name } - { data.name } • Biblioteca de Tóquio</title>
            </Head>
			<ContentPage.Header cover={ data.cover } title={ data.name } type={ data.type.name } />
			<Main>
				<Breadcumbs data={
					[ { text: "Início", href: "/" } , { text: "Conteúdo", href: "/content" } , { text: data.name, active: true } ]
				} />
				<ContentPage.Description value={ data.description } />
				<ContentPage.Block>
					<Caption>Vantagens</Caption>
					<p>São { vantagem.counter } vantagens nesse pacote de conteúdo</p>
					<ContentPage.Column.List>
						{
							vantagem.list.map(
								item => 
								<ContentPage.Column.Item key={ item }>
									<Link href={ `/${ item.path }${ item.group ? `#${item._id}` : '' }`}><a>{ item.name }</a></Link>
								</ContentPage.Column.Item>
							)
						}
					</ContentPage.Column.List>
				</ContentPage.Block>
				<ContentPage.Block>
					<Caption>Desvantagens</Caption>
					<p>São { desvantagem.counter } desvantagens nesse pacote de conteúdo</p>
					<ContentPage.Column.List>
						{ 
							desvantagem.list.map(
								item => 
								<ContentPage.Column.Item key={ item }>
									<Link href={ `/${ item.path }${ item.group ? `#${item._id}` : '' }`} ><a>{ item.name }</a></Link>
								</ContentPage.Column.Item>
							)
						}
					</ContentPage.Column.List>
				</ContentPage.Block>
			</Main>
		</>
	)
}

const query_default = groq`*[ _type == "source" && slug.current == $slug ][0]{ 
	name, 
	description,
	"cover": image.asset->url,
	"type" : { "name": type->name, "slug": type->slug.current },
	"vantagem": *[ _type == "rule" && ^._id in origin[].source._ref && type->slug.current == 'vantagem' ]{ name, "group": group->name, "slug" : slug.current, "type_slug" : type->slug.current } | order(slug),
	"desvantagem": *[ _type == "rule" && ^._id in origin[].source._ref && type->slug.current == 'desvantagem' ]{ name, "group": group->name, "slug" : slug.current, "type_slug" : type->slug.current } | order(slug),
  }`

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    let data = await client.fetch(query_default, { slug })
    return { props: { data } }
}

const query_path = groq`*[ _type == "source" ]{ "slug": slug.current }`
export async function getStaticPaths() {
    const paths = await client.fetch( query_path )
    return {
        paths: paths.map( (item) => ( { params: item } ) ),
        fallback: true,
    }
}

Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}