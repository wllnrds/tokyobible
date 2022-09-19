import styles from './Tags.module.scss';

export function Tags({children}){
    return <div className={ styles.tags }>{ children }</div>
}

export function TagItem({ children, active = false, onclick = () => {} }){
    return <a onClick={ onclick } className={ `${ styles.item } ${ active && styles.active }` }>{ children }</a>
}

export default { Holder: Tags, Item : TagItem }