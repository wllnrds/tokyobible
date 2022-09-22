import groq from 'groq'

import client from '../../client'
import Layout, { Page as ContentPage, Main, Breadcumbs, ViewBlock } from '../../components/layout'

const query_path = groq`*[_type == "rule" && defined(slug.current)]{ "slug": slug.current, "type": type->slug.current }`
const query_default = groq`*[_type == "rule" && slug.current == $slug && type.ref in *[_type == "contentType" && slug.current == $type].id ][0]{ ... , description[]{ ..., markDefs[]{ ..., _type == "internalLink" => { "ref_type": @.reference->_type , "slug": @.reference->slug.current, "type_slug": @.reference->type->slug.current } } },"type": type -> name, "type_slug": type->slug.current,"origin": origin[]{page,"source": source->name } }`;
const query_group = groq`*[_type == "ruleGroup" && _id == $group]{...,description[]{ ..., markDefs[]{ ..., _type == "internalLink" => { "ref_type": @.reference->_type , "slug": @.reference->slug.current, "type_slug": @.reference->type->slug.current } } },"type_slug": type->slug.current, "rules": *[_type=='rule' && references(^._id)] | order(name) }[0]{ ... , description[]{ ..., markDefs[]{ ..., _type == "internalLink" => { "_type": @.reference->_type , "slug": @.reference->slug.current, "type_slug": @.reference->type->slug.current } } },"type" : type -> name, "rules": rules[]{...,"type": type->name,"type_slug": type->slug.current,"origin": origin[]{page,"source": source->name}} }`;

export default function Page({ item, refer}) {
	return (
		item && <>
			<Main>
			    <ViewBlock.Header title={ item.name } type={ item.type } theme={ item.type_slug }/>
				<Breadcumbs data={ [ { text: "Início", href: "/" } , { text: item.name, active: true } ] } />
                <ViewBlock.Value value={ item.value } theme={ item.type_slug } />
				<ContentPage.Description value={ item.description } />
                <ViewBlock.Footer>
                    { item.origin && item.origin.map( crr => <div key={ item.source + crr.page }>{ crr.source } p.{ crr.page }</div>) }
                </ViewBlock.Footer>
                <ViewBlock.List>
                    {
                        item.rules?.map( subitem => {
                            return <ViewBlock.SubItem key={ subitem._id } id={ subitem._id } title={ subitem.name } theme={ item.type_slug }>
                                    <ViewBlock.Value value={ subitem.value } theme={ item.type_slug } />
                                    <ContentPage.Description value={ subitem.description } />
                                    <ViewBlock.Footer>
                                        { subitem.origin.map( crr => <div key={ item.source + crr.page }>{ crr.source } p.{ crr.page }</div>) }
                                    </ViewBlock.Footer>
                                </ViewBlock.SubItem>
                        })
                    }
                </ViewBlock.List>
			</Main>
		</>
	)
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