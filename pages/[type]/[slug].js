import groq from 'groq'
import {PortableText} from '@portabletext/react'

import client from '../../client'
import styles from '../../styles/Block.module.scss'

const query_path = groq`*[_type == "rule" && defined(slug.current)]{ "slug": slug.current, "type": type->slug.current }`

export async function getStaticPaths() {
    const paths = await client.fetch( query_path )
    return {
        paths: paths.map((item) => ({ params: { ...item } })),
        fallback: true,
    }
}

function Block({ data, isRoot = false, extra = 0 }){
    return (<section className={ styles.block }>
        <header>
            { isRoot && <div className={ styles.tag }>{ data.type }</div> }
            { isRoot && <h1 id={ data._id } className={ styles.title }>{ data.name || "Sem nome"}</h1> }
            { !isRoot && <h2 id={ data._id } className={ styles.title }>{ data.name || "Sem nome"}</h2> }
            <div className={ styles.value }>Custo { isRoot ? data.value : data.value > 0 ? `+${ data.value }` : data.value }</div>
        </header>
        <article className={ styles.description }><PortableText value={ data.description || {} } /></article>
        { data.rules && <section className={ styles.list }>
            <hr />
            { data.rules.map( sub => <Block key={ sub._id } data={ sub } extra={ data.value } /> ) }
        </section> }
        { data.origin && <footer className={ styles.footer }>{ data.origin.map( item => <div key={ item.source + item.page }>{ item.source } p.{ item.page }</div>) }</footer> }
    </section>)
}

const Page = ( data ) => {
    const { item = null, refer = null } = data
    return <div className={ styles.page }>{ item && <Block data={ item } isRoot={true} /> }</div>
}

const query_default = groq`*[_type == "rule" && slug.current == $slug && type.ref in *[_type == "contentType" && slug.current == $type].id ][0]{ ... , "type": type -> name, "origin": origin[]{page,"source": source->name } }`;
const query_group = groq`*[_type == "ruleGroup" && _id == $group]{...,"rules":*[_type=='rule' && references(^._id)]}[0]{ ... , "type" : type -> name, "rules": rules[]{...,"type": type->name,"origin": origin[]{page,"source": source->name}} }`;

export async function getStaticProps(context) {
    const { type = "", slug = "" } = context.params
    let data = null
    let item = await client.fetch(query_default, { slug, type })

    if( item && item.group ){
        const group = await client.fetch(query_group, { group: item.group._ref });
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

export default Page
