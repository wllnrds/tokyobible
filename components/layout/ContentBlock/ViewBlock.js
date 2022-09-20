import Link from 'next/link';
import { useRouter } from 'next/router';
import Caption from '../Caption';
import styles from './Content.module.scss';
import stylesHeader from './Header.module.scss';

function ContentBlock({ title = "Título ausente" , cover = "/static/images/placeholder/content.png", href = "" }){
    return <Link href={ href }>
        <a className={ styles.block }>
            <div className={ styles.title }>{ title }</div>
            <div className={ styles.cover } style={{ backgroundImage: `url('${ cover }')` }}></div>
        </a>
    </Link>
}

function ContentHolder({ children }){
    return <div className={ styles.grid }>{ children }</div>
}

function Empty(){
    return <div className={ styles.empty }>Não tem nada aqui</div>
}

function Header({ title = "Título ausente" , type = "", theme }){
    return <header className={ stylesHeader.header }>
        <Caption theme={ theme }>{ type }</Caption>
        <h2 className={ stylesHeader.title }>{ title }</h2>
    </header>
}

function Value({ value, theme = "default"}){
    return (value) ? <div className={ `${styles.value} ${ styles[theme] }` }>Custo { value }</div> : null
}

function Footer({children}){
    return <footer className={ styles.footer }>{ children }</footer>
}

function SubItem({ children, id, title = "", theme = "default"}){
    const router = useRouter() 
    const isActive = router.asPath.endsWith(id)
    return <section id={ id }  className={ `${ styles.subitem } ${ styles[theme] } ${ isActive ? styles.active : '' }`} >
        <h3 className={ styles.title }>{ title }</h3>
        { children }
    </section>
}

function List({ children }){
    return <section className={ styles.subitemList }>{ children }</section>
}

const Modules = { Holder: ContentHolder, Item : ContentBlock, Empty, Header, Value, Footer, SubItem, List }

export default Modules