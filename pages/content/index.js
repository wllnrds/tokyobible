import groq from 'groq'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import client from '../../client'
import Layout, { Caption, Tags, ContentBlock, Main, Breadcumbs, ViewBlock } from '../../components/layout'
import { IconButton } from '../../components/layout/Tab/MenuItem'

export default function Page({ data }) {
	const router = useRouter()
	const [list, setList] = useState( [] )
	const [filter, setFilter] = useState( 'tudo' )
	const [view, setView] = useState( false )

	const fromStorage = ( key = "", value = false ) => {
		if(typeof window !== 'undefined' && localStorage ){
			if( value ){
				localStorage.setItem( key, value )
			}else{
				return localStorage.getItem( key )
			}
		}
	}

	useEffect(()=>{
		const viewMode = fromStorage('viewMode');
		if(typeof viewMode === 'string'){
			setView(viewMode)
		}else{
			setView('default')
		}

		const hash = router.asPath.split('#')[1]
		if(hash){
			setFilter(hash)
		}
	},[])

	useEffect(()=>{
		console.log(router.asPath)
	},[ router ])

	useEffect(()=>{
		fromStorage('viewMode', view);
	},[ view ])

	useEffect(()=>{
		if(filter != 'tudo'){
			setList( data.filter( i => i.type === filter ) )
		}else{
			router.push({ hash : 'tudo' })
			setList( data )
		}
	}, [ filter, data ])

	function filtering(tag){
		router.push({ hash : tag })
		setFilter(tag)
	}

	return (
		<Main>
			<Head>
				<title>Conteúdo • Biblioteca de Tóquio</title>
			</Head>
			<ViewBlock.Header title={ "Conteúdo" }/>
			<div style={{ position: 'absolute', top: '8px', right:'8px', display: 'flex', alignItems: 'flex-start', border: '1px solid var(--color-main-shadow)', borderRadius: '20px' }}>
				<IconButton icon="view_agenda" active={ view === "list" } onclick={ ()=>{ setView( "list" ) } } /> 
				<IconButton icon="grid_view"  active={ view === "default" } onclick={ ()=>{ setView( "default" ) } } />
				<IconButton icon="rectangle"  active={ view === "view" } onclick={ ()=>{ setView( "view" ) } } />
			</div>
			<Breadcumbs data={ [ { text: "Início", href: "/" }, { text: "Conteúdo", active: true } ] } />
			<Tags.Holder>
				Ver por <Tags.Item active={ filter === 'tipos' } onclick={ ()=>{ filtering('tipos') } }>Tipos</Tags.Item>
			</Tags.Holder>
			<Tags.Holder>
				<ViewBlock.Flex.FlexBox>
					<ViewBlock.Flex.FlexBoxItem>
						Filtrar fonte de conteúdo
					</ViewBlock.Flex.FlexBoxItem>
					<ViewBlock.Flex.FlexBoxItem>
						<Tags.Item active={ filter === 'tudo' || false } onclick={ ()=>{ filtering('tudo') } }>Todos</Tags.Item>
						<Tags.Item active={ filter === 'livro' || false } onclick={ ()=>{ filtering('livro') } }>Livro</Tags.Item>
						<Tags.Item active={ filter === 'revista' || false } onclick={ ()=>{ filtering('revista') } }>Revista</Tags.Item>
					</ViewBlock.Flex.FlexBoxItem>
				</ViewBlock.Flex.FlexBox>
			</Tags.Holder>
			<ContentBlock.Holder theme={ view || 'default' }>
			{ 
				filter !== 'tipos' && 
				list.filter( i => i._type === 'source' ).length > 0 && 
				list.filter( i => i._type === 'source' ).map( 
					item => { 
						return <ContentBlock.Item key={ item._id } title={ item.name } cover={ item.cover } href={{ pathname:`/content/[slug]`, query: { slug: item.slug } }} />
					}
				)
			}
			{ 
				filter === 'tipos' && 
				list.filter( i => i._type === 'contentType' ).length > 0 && 
				list.filter( i => i._type === 'contentType' ).map( 
					item => { 
						return <ContentBlock.Item key={ item._id } title={ item.name } cover={ item.cover } href={{ pathname:`/types/[slug]`, query: { slug: item.slug } }} />
					}
				)
			}
			{  list.length == 0 && <ContentBlock.Empty /> }
			</ContentBlock.Holder>
			
			<ContentBlock.Holder theme={ view || 'default' }>
			</ContentBlock.Holder>
		</Main>
	)
}

const query_default = groq`*[ _type == "source" ]{ _id, _type, name, "type" : type->slug.current, "cover": image.asset->url, "slug": slug.current } | order( name )`
const query_types = groq`*[ _type == "contentType" && indexed == true ]{ _id, _type, name, "type" : "tipos", "cover": image.asset->url, "slug": slug.current } | order( name )`

export async function getStaticProps(context) {
    let data_sources = await client.fetch(query_default)
    let data_types = await client.fetch(query_types)
    return { 
		props: { data : [ ...data_sources, ...data_types ] },
		revalidate: 10
	}
}

Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}