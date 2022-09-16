import {PortableText} from '@portabletext/react'
import Link from 'next/link'
import styles from './Block.module.scss'

export default function Block({ data}){
    return (
        <Link href={{ pathname:`/[type]/[slug]`, query: { type: data.type_slug, slug: data.slug }, hash : data.group && `#${data._id}` }}>
            <a className={ styles.block }>
                <div id={ data._id } className={ styles.title }>{ data.name || "Sem nome"}</div>
                <div className={ styles.tag }>{ data.type }</div>
                <div className={ styles.excerpt }><PortableText value={ data.description } /></div>
            </a>
        </Link>
    )
}