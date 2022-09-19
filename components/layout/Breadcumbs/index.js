import Link from 'next/link';

import styles from './Breadcumbs.module.scss';

function Separator(){
    return <span className="material-symbols-rounded">chevron_right</span>
}

export default function Caption({ data = [] }){
    return <div className={ styles.breadcumbs }>
        { 
            data.map( (item, index) => {
                return <>
                    { item.href && <Link href={ item.href }><a className={ `${ styles.item } ${ item.active && styles.active }` }>{ item.text }</a></Link> }
                    { !item.href && <span className={ `${ styles.item } ${ item.active && styles.active }` }>{ item.text }</span> }
                    { ( index < data.length-1 ) && <Separator /> }
                </>
            })
        }
    </div>
}