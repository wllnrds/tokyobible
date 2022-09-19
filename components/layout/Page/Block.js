import styles from './Page.module.scss';

export default function Block({ children }){
    return <section className={ styles.block }>{ children }</section>
}