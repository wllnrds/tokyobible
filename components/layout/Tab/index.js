import Item from './MenuItem';
import styles from './Menu.module.scss';

export default function Tab(){
    return <aside className={ styles.tab }>
        <menu className={ styles.menu }>
            <Item text="Início" icon="home" href="/" />
            <Item text="Busca" icon="search" href="/search" />
            <Item text="Conteúdo" icon="auto_stories" href="/content" />
            <Item text="Sobre" icon="contact_support" href="/about" />
            {/* <Item text="Nova ficha" icon="person_add" href="/ficha/criar" /> */}
        </menu>
        <footer className={styles.footer}>
            <a href="https://instagram.com/wlln.rds" target="_blank" rel="noopener noreferrer">
                Powered by @<strong>wlln.rds</strong>
            </a>
        </footer>
    </aside>
}