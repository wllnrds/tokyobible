import Link from 'next/link';
import { useRouter } from 'next/router';
import Caption from '../Caption';
import styles from './Content.module.scss';
import stylesHeader from './Header.module.scss';

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

export function Header({ title = "Título ausente" , type = "", theme }){
    return <header className={ stylesHeader.header }>
        <Caption theme={ theme }>{ type }</Caption>
        <h2 className={ stylesHeader.title }>{ title }</h2>
    </header>
}

export function Value({ value, theme = "default"}){
    return (value) ? <div className={ `${styles.value} ${ styles[theme] }` }>Custo { value }</div> : null
}

export function Footer({children}){
    return <footer className={ styles.footer }>{ children }</footer>
}

export function SubItem({ children, id, title = "", theme = "default"}){
    const router = useRouter() 
    const isActive = router.asPath.endsWith(id)
    return <section id={ id }  className={ `${ styles.subitem } ${ styles[theme] } ${ isActive ? styles.active : '' }`} >
        <h3 className={ styles.title }>{ title }</h3>
        { children }
    </section>
}

export function List({ children }){
    return <section className={ styles.subitemList }>{ children }</section>
}

export default { Holder: ContentHolder, Item : ContentBlock, Empty, Header, Value, Footer, SubItem, List }