import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'

export default function Page() {
	return (
		<main className={styles.main}>
			{/* <div className={styles.search}>
				<input type="search" />
			</div> */}
			<section className={styles.grade}>
				<section className={`${styles.item} ${styles.green}`}>
					<Link href={{ pathname:'/[type]', query: { type: 'vantagem' } }}>
						<a>Vantagem</a>
					</Link>
				</section>
				<section className={`${styles.item} ${styles.purple}`}>
					<Link href={{ pathname:'/[type]', query: { type: 'desvantagem' } }}>
						<a>Desvantagem</a>
					</Link>
				</section>
			</section>
		</main>
	)
}


Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}