import Image from 'next/image';
import Link from 'next/link';
import styles from './Content.module.scss';

function ContentHeader({ main, side }){
    return <header className={ styles.contentHeader }>
        <div className={ styles.main }>{ main }</div>
        <div className={ styles.side }>{ side }</div>
    </header>
}

function ContentBlock({ title = "Título ausente" , cover = "/static/images/placeholder/content.png", href = "" }){
    return <Link href={ href } className={ styles.block }>
        <div className={ styles.title }>{ title }</div>
        <div className={ styles.cover }>
            <Image src={ cover } alt="Capa" width={ 1000 } height={ 654 } layout="responsive" />
        </div>
    </Link>
}

function ContentHolder({ children, theme }){
    return <div className={ `${ styles.grid } ${ styles[theme] }` }>{ children }</div>
}

function Empty(){
    return <div className={ styles.empty }>Não tem nada aqui</div>
}

const Modules = { Holder: ContentHolder, Item : ContentBlock, Empty, ContentHeader }

export default Modules