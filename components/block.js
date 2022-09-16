import {PortableText} from '@portabletext/react'
import { useRouter } from 'next/router'
import styles from './Block.module.scss'

export default function Block({ data, isRoot = false, extra = 0 }){
    const router = useRouter()   
    const isActive = router.asPath.endsWith(data._id)
    return (<section className={ `${ styles.block } ${ isActive && styles.active }`} id={ data._id }>
        <header>
            { isRoot && <div className={ `${ styles.tag } ${ data.type_slug }` }>{ data.type }</div> }
            { isRoot && <h1 className={ styles.title }>{ data.name || "Sem nome"}</h1> }
            { !isRoot && <h2 className={ styles.title }>{ data.name || "Sem nome"}</h2> }
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