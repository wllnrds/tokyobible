import Link from 'next/link';
import styles from './Content.module.scss';

export function ContentBlock({ title = "Título ausente" , cover = "/static/images/placeholder/content.png", href = "" }){
    return <Link href={ href }>
        <a className={ styles.block }>
            <div className={ styles.title }>{ title }</div>
            <div className={ styles.cover } style={{ backgroundImage: `url('${ cover }')` }}></div>
        </a>
    </Link>
}

export function ContentHolder({ children }){
    return <div className={ styles.grid }>{ children }</div>
}

export function Empty(){
    return <div className={ styles.empty }>Não tem nada aqui</div>
}

export default { Holder: ContentHolder, Item : ContentBlock, Empty }