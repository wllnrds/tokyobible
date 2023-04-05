import Link from 'next/link';
import Description from '../Page/Description';
import styles from './Resume.module.scss';

function ContentBlock({ data }){
    return <Link href={{ pathname:`/[type]/[slug]`, query: { type: data.type_slug, slug: data.slug }, hash : data.group && `#${data._id}` }} className={ styles.block }>
        <div id={ data._id } className={ styles.title }>{ data.name || "Sem nome"}</div>
        <div className={ styles.tag }>{ data.type }</div>
        <Description value={ data.description[0] } />
    </Link>
}

function ContentHolder({ children }){
    return <div className={ styles.list }>{ children }</div>
}

function Empty(){
    return <div className={ styles.empty }>Não tem nada aqui</div>
}

const Modules = { Holder: ContentHolder, Item : ContentBlock, Empty }

export default Modules