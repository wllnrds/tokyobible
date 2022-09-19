import groq from 'groq'
import { useEffect, useState } from 'react'

import client from '../../client'
import Layout, { Caption, Tags, ContentBlock, Main } from '../../components/layout'

export default function Page({ data }) {
	const [list,setList] = useState( [] )
	const [filter,setFilter] = useState( false )

	useEffect(()=>{
		setList([...data])
	}, [data])

	useEffect(()=>{
		if(filter){
			setList( data.filter( i => i.type === filter ) )
		}else{
			setList( data )
		}
	}, [filter])

	return (
		<Main>
			<Caption>Conteúdo</Caption>
			<Tags.Holder>
				<Tags.Item active={ !filter } onclick={ ()=>{ setFilter(false) } }>Tudo</Tags.Item>
				<Tags.Item active={ filter === 'livro' } onclick={ ()=>{ setFilter('livro') } }>Livro</Tags.Item>
				<Tags.Item active={ filter === 'revista' } onclick={ ()=>{ setFilter('revista') } }>Revista</Tags.Item>
			</Tags.Holder>
			<ContentBlock.Holder>
			{ 
				list.length > 0 ? 
					list.map( item => { return <ContentBlock.Item key={ item._id } title={ item.name } cover={ item.cover } href={{ pathname:`/content/[slug]`, query: { slug: item.slug } }} /> })
					: <ContentBlock.Empty />
			}
			</ContentBlock.Holder>
		</Main>
	)
}

const query_default = groq`*[ _type == "source" ]{ _id, name, "type" : type->slug.current, "cover": image.asset->url, "slug": slug.current }`
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