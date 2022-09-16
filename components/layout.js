import styles from '../styles/Home.module.scss'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            {children}
            <footer className={styles.footer}>
                <a href="https://instagram.com/wlln.rds" target="_blank" rel="noopener noreferrer">
                    Powered by @<strong>wlln.rds</strong>
                </a>
            </footer>
        </div>
    )
}
