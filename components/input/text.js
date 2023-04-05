import { useEffect, useState } from 'react'
import styles from './style.module.scss'

function Text({ onChange = false , startValue = '', label = '', children }){
    const [value, setValue] = useState("")

    useEffect(()=>{ 
        setValue(startValue)
    },[startValue])

    function handleChange(event){
        setValue(event.target.value)
        if(onChange){
            onChange(event.target.value)
        }
    }

    return <div className={ styles.box }>
        <label className={ styles.wrap }>
            <input className={ styles.input } type="text" onChange={ handleChange } value={ value } />
            { ( label || children ) && <span className={ `${ styles.label } ${ styles.placeholder }` }>{ label }</span> }
        </label>
        { children }
    </div>
}

export default Text