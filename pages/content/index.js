import groq from 'groq'
import { useEffect, useState } from 'react'

import client from '../../client'
import Layout, { Caption, Tags, ContentBlock, Main } from '../../components/layout'
import { IconButton } from '../../components/layout/Tab/MenuItem'

export default function Page({ data }) {
	const [list,setList] = useState( [] )
	const [filter,setFilter] = useState( false )

	const [view, setView] = useState(false)

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
	},[])

	useEffect(()=>{
		fromStorage('viewMode', view);
	},[view])

	useEffect(()=>{
		setList([...data])
	}, [data])

	useEffect(()=>{
		if(filter){
			setList( data.filter( i => i.type === filter ) )
		}else{
			setList( data )
		}
	}, [ filter, data ])

	return (
		<Main>
			<ContentBlock.ContentHeader 
				main={ <Caption theme="heading">Conteúdo</Caption> }
				side={ <>
					<IconButton icon="view_agenda" active={ view === "list" } onclick={ ()=>{ setView( "list" ) } } /> 
					<IconButton icon="grid_view"  active={ view === "default" } onclick={ ()=>{ setView( "default" ) } } />
					<IconButton icon="rectangle"  active={ view === "view" } onclick={ ()=>{ setView( "view" ) } } />
				</> }
			/>
			<div style={{ display: 'flex', alignItems: 'center', alignItems: 'flex-start' }}>
				<div style={{ flex: 1 }}>
					
				</div>
				<div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
				</div>
			</div>
			<Tags.Holder>
				<Tags.Item active={ !filter } onclick={ ()=>{ setFilter(false) } }>Tudo</Tags.Item>
				<Tags.Item active={ filter === 'livro' } onclick={ ()=>{ setFilter('livro') } }>Livro</Tags.Item>
				<Tags.Item active={ filter === 'revista' } onclick={ ()=>{ setFilter('revista') } }>Revista</Tags.Item>
			</Tags.Holder>
			<ContentBlock.Holder theme={ view || 'default' }>
			{ 
				list.length > 0 ? 
					list.map( item => { 
						return <ContentBlock.Item key={ item._id } title={ item.name } cover={ item.cover } href={{ pathname:`/content/[slug]`, query: { slug: item.slug } }} />
					} ) : <ContentBlock.Empty />
			}
			</ContentBlock.Holder>
		</Main>
	)
}

const query_default = groq`*[ _type == "source" ]{ _id, name, "type" : type->slug.current, "cover": image.asset->url, "slug": slug.current } | order( name )`

export async function getStaticProps(context) {
    let data = await client.fetch(query_default)
    return { props: { data } }
}

Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}