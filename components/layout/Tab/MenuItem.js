import Link from "next/link";
import styles from './Menu.module.scss';

export default function MenuItem({ href, icon, text }){
    return <Link href={ href }>
        <a className={ styles.link }>
            { icon && <i className={ `material-symbols-rounded ${ styles.icon }` }>{ icon }</i>}<span className={ styles.text }>{ text }</span>
        </a>
    </Link>
}