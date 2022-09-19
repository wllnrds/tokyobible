import styles from './Caption.module.scss';

export default function Caption({ children, theme = 'default' }){
    return <div className={ `${styles.title} ${ styles[theme] }` }>{ children }</div>
}