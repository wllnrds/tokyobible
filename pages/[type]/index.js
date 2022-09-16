import groq from 'groq'

import client from '../../client'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Block from '../../components/resume'

const query_path = groq`*[_type == "contentType" && defined(slug.current)]{ "type": slug.current }`
const query_default = groq`*[_type == "rule" && type->slug.current == $type]{ _id, "name" : coalesce(group->name + " :: ", "") + name , "group": group->name, "type": type -> name, "type_slug" : type->slug.current, "slug": slug.current, "description" : description[0] } | order(name)`;

export default function Page({ data }){
    return <Container>{ data && data.map( item => <Block data={ item } /> ) }</Container>
}

export async function getStaticProps(context) {
    const { type = "" } = context.params
    let data = await client.fetch(query_default, { type })
    return { props: { data } }
}

export async function getStaticPaths() {
    const paths = await client.fetch( query_path )
    return {
        paths: paths.map((item) => ({ params: { ...item } })),
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