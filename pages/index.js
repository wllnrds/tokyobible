import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'

export default function Page() {
	return (
		<main className={styles.main}>
			{/* <div className={styles.search}>
				<input type="search" />
			</div> */}
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