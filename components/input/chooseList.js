import styles from './chooseList.module.scss'

function ChooseList({ label = '', children }){
    return <div className={ styles.box }>
        <div className={ styles.wrap }>
            { label && <span className={ styles.label }>{ label }</span> }
        </div>
        <div className={ styles.list }>
            { children }
        </div>
    </div>
}

function ItemList({ onClick = ()=>{} , title, info, selected, hide = false, children }){
	return !hide ? <div className={ `${ styles.card } ${ selected ? styles.active : '' }` } onClick={ onClick }>
		<div className={ styles.header }>
			<div className={ styles.title }>{ title }</div>
			<div className={ styles.info }>{ info }</div>
		</div>
		{ children && <div className={ styles.text }>{ children }</div> }
	</div> : null
}

const Components = { ChooseList, ItemList }

export default Components