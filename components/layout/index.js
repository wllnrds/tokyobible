import styles from './Base.module.scss'

import Tab from './Tab';
import Caption from './Caption'
import Tags from './Tags'
import ContentBlock from './ContentBlock'
import ViewBlock from './ContentBlock/ViewBlock'
import Resume from './ContentBlock/resume'
import Page from './Page'
import Breadcumbs from './Breadcumbs'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Tab />
            <section className={ styles.main }>
                <div className={ styles.content }>
                    {children}
                </div>
            </section>
        </div>
    )
}

function Main({ children }){
    return <section className={ styles.content }>{ children }</section>
}

export { Caption, Tags, ContentBlock, Page, Main, Breadcumbs, Resume, ViewBlock }
