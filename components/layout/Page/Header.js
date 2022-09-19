import styles from './Page.module.scss';
import Caption from '../Caption';

export default function Header({ title = "Título ausente" , cover = "/static/images/placeholder/content.png", type = "Livro" }){
    return <header className={ styles.header }>
        <Caption theme="contrast">{ type }</Caption>
        <h2 className={ styles.title }>{ title }</h2>
        <div className={ styles.cover } style={{ backgroundImage: `url('${ cover }')` }}></div>
    </header>
}