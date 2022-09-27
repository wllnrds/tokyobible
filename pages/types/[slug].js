import groq from 'groq'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import client from '../../client'
import Layout, { Page as ContentPage, Main, Caption, Breadcumbs, Tags } from '../../components/layout'

function prepareRules(data = []){
	const list = data.map( item => ( {
		name: ( (item.group)? `${item.group} :: ${item.name}` : item.name ) + ` (${ item.group_value + item.value })`,
		path: `${ item.type_slug }/${ item.slug }`
	} ) )
	return list;
}

export default function Page({ data }) {
	const [ order,setOrder ] = useState( false )
	const [ dataRules, setDataRules ] = useState([])

	useEffect(()=>{
		setDataRules([])
		let list = [...data.rules]
		if(order){
			list.sort( (a,b) => ( a.group_value + a.value ) - ( b.group_value + b.value ) )
		}
		setDataRules(prepareRules(list))
	},[ order , data])

	return (
		data && <>
			<Head>
				<title>{ data.name } • Biblioteca de Tóquio</title>
			</Head>
			<ContentPage.Header cover={ data.cover } title={ data.name } />
			<Main>
				<Breadcumbs data={
					[ { text: "Início", href: "/" } , { text: "Conteúdo", href: "/content" } , { text: data.name, active: true } ]
				} />
				<ContentPage.Description value={ data.description } />
				<ContentPage.Block>
					<Caption>Itens ({ dataRules.length })</Caption>
					<Tags.Holder>
						Organizar por
						<Tags.Item active={ !order } onclick={ ()=>{ setOrder(false) } }>Nome</Tags.Item>
						<Tags.Item active={ order === 'custo' } onclick={ ()=>{ setOrder('custo') } }>Custo</Tags.Item>
					</Tags.Holder>
					<ContentPage.Column.List>
						{
							dataRules.map(
								item => 
								<ContentPage.Column.Item key={ item.path }>
									<Link href={ `/${ item.path }${ item.group ? `#${item._id}` : '' }`}><a>{ item.name }</a></Link>
								</ContentPage.Column.Item>
							)
						}
					</ContentPage.Column.List>
				</ContentPage.Block>
			</Main>
		</>
	)
}

const query_default = groq`*[ _type == "contentType" && slug.current == $slug ][0]{ 
	name, 
	description,
	"cover": image.asset->url,
	"rules": *[ _type == "rule" && type->slug.current == $slug ]{ name, "group": group->name, "slug" : slug.current, "type_slug" : type->slug.current, value, "group_value" : group->value } | order(slug),
}`

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    let data = await client.fetch(query_default, { slug })
    return { 
		props: { data },
		revalidate: 10
	}
}

const query_path = groq`*[ _type == "contentType" && indexed == true ]{ "slug": slug.current }`
export async function getStaticPaths() {
    const paths = await client.fetch( query_path )
    return {
		paths: paths.map( (item) => ( { params: item } ) ),
		fallback: true
	}
}

Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}