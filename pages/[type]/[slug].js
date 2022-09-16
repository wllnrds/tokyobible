import groq from 'groq'

import client from '../../client'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Block from '../../components/block'

const query_path = groq`*[_type == "rule" && defined(slug.current)]{ "slug": slug.current, "type": type->slug.current }`
const query_default = groq`*[_type == "rule" && slug.current == $slug && type.ref in *[_type == "contentType" && slug.current == $type].id ][0]{ ... , "type": type -> name, "origin": origin[]{page,"source": source->name } }`;
const query_group = groq`*[_type == "ruleGroup" && _id == $group]{...,"rules":*[_type=='rule' && references(^._id)]}[0]{ ... , "type" : type -> name, "rules": rules[]{...,"type": type->name,"origin": origin[]{page,"source": source->name}} }`;
export default function Page( data ){
    const { item = null, refer = null } = data
    return <Container>{ item && <Block data={ item } isRoot={true} /> }</Container>
}

export async function getStaticProps(context) {
    const { type = "", slug = "" } = context.params
    let data = null
    let item = await client.fetch(query_default, { slug, type })

    if( item.group ){
        const group = await client.fetch(query_group, { group: item.group._ref })        
        data = {
            item: group,
            refer: item._id
        }
    }else{
        data = {
            item
        }
    }

    return { props: { ...data } }
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