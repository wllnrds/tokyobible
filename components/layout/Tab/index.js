import Item from './MenuItem';
import styles from './Menu.module.scss';

export default function Tab(){
    return <aside className={ styles.tab }>
        <menu className={ styles.menu }>
            <Item text="Início" icon="home" href="/" />
            <Item text="Busca" icon="search" href="/search" />
            <Item text="Conteúdo" icon="auto_stories" href="/content" />
        </menu>
    </aside>
}