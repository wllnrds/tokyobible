import styles from './style.module.scss'

function Submit({ onClick = ()=>{}, children }){
    return <button className={ styles.button } onClick={ onClick }>{ children }</button>
}

export default Submit