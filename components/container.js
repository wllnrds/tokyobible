import styles from './Block.module.scss'

export default function Container({ children }){
    return (<section className={ styles.container }>{ children }</section>)
}