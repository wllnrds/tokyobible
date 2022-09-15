import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <div className={styles.search}>
          <input type="search" />
        </div>
        <section className={styles.grade}>
          <section className={`${styles.item} ${styles.green}`}>
            <a href="#">Vantagem</a>
          </section>
          <section className={`${styles.item} ${styles.purple}`}>
            <a href="#">Desvantagem</a>
          </section>
          <section className={`${styles.item} ${styles.magenta}`}>
            <a href="#">Livros</a>
          </section>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://instagram.com/wlln.rds"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by @<strong>wlln.rds</strong>
        </a>
      </footer>
    </div>
  )
}
