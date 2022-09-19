import styles from './Page.module.scss';

export function List({ children }){
    return <ul className={ styles.list }>{ children }</ul>
}

export function Item({ children }){
    return <li className={ styles.item }>{ children }</li>
}

export default { List, Item }
