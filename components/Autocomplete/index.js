import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Autocomplete.module.scss'

function Autocomplete({ onChange = false , startValue = '', data = [], onSubmit = false }){
    const [ options, setOptions ] = useState( [] )

    const [ query, setQuery ] = useState( '' )

    useEffect(()=>{
        setQuery(startValue)
    },[startValue])

    function handleChange(event){
        setQuery(event.target.value)
        if(onChange){
            onChange(event.target.value)
        }
    }

    function handleSubmit(event){
		event.preventDefault();
        document.activeElement.blur();
        if(onSubmit){
            onSubmit(query)
        }
    }

    useEffect(()=>{ setOptions(data) }, [data])

    return <form className={ styles.field } onSubmit={ handleSubmit }>
        <input className={ styles.input } type="seach" onChange={ handleChange } value={ query } />
        {
            options.length > 0 &&  
            <ul className={ styles.list }>
                { 
                    options.map( item => 
                    <li className={ styles.item } key={ item._id }>
                        <Link href={ { pathname:`/[type]/[slug]`, query: { type: item.type_slug, slug: item.slug }, hash : item.group && `#${item._id}` } }>
                            <a>{ item.name }</a>
                        </Link>
                    </li>
                )}
            </ul>
        }
    </form>
}

export default Autocomplete