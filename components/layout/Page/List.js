import styles from './Page.module.scss';

function List({ children }){
    return <ul className={ styles.list }>{ children }</ul>
}

function Item({ children }){
    return <li className={ styles.item }>{ children }</li>
}

const Modules = { List, Item }

export default Modules