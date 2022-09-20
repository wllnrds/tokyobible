import styles from './Tags.module.scss';

function Tags({children}){
    return <div className={ styles.tags }>{ children }</div>
}

function TagItem({ children, active = false, onclick = () => {} }){
    return <a onClick={ onclick } className={ `${ styles.item } ${ active && styles.active }` }>{ children }</a>
}

const Modules = { Holder: Tags, Item : TagItem }

export default Modules