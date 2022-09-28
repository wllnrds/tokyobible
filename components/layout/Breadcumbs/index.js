import Link from 'next/link';

import styles from './Breadcumbs.module.scss';

function Separator(){
    return <span className="material-symbols-rounded">chevron_right</span>
}

export default function Caption({ data = [] }){
    const itens = data.map( (item, index) => {
        if( item.href ){
            return <Link href={ item.href } key={ item.href }><a className={ `${ styles.item } ${ item.active && styles.active }` }>{ item.text }</a></Link>
        }else{
            return <span key={ item.text } className={ `${ styles.item } ${ item.active && styles.active }` }>{ item.text }</span>
        }
    })

    const separators = []

    itens.forEach( (item, index) => {
        separators.push(item)
        index < data.length-1 && separators.push(<Separator key={ Date.now() } />)
    })

    return <div className={ styles.breadcumbs }>{ separators }</div>
}