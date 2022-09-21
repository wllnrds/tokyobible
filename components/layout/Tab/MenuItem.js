import Link from "next/link";
import styles from './Menu.module.scss';

export default function MenuItem({ href, icon, text }){
    return <Link href={ href }>
        <a className={ styles.link }>
            { icon && <i className={ `material-symbols-rounded ${ styles.icon }` }>{ icon }</i> }
            { text && <span className={ styles.text }>{ text }</span> }
        </a>
    </Link>
}

export function IconButton({ onclick, icon, active }){
    return <a className={ `${ styles.iconLink } ${ active && styles.active }`} onClick={ onclick }>
        { icon && <i className={ `material-symbols-rounded ${ styles.icon }` }>{ icon }</i> }
    </a>
}