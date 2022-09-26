import { useEffect, useState } from 'react';
import Layout, { Page as ContentPage, Main, Caption, Resume, Breadcumbs, ViewBlock } from '../components/layout';
import Autocomplete from '../components/Autocomplete';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Page() {
	const router = useRouter();

	const [ query, setQuery ] = useState()
	const [ options, setOptions ] = useState([])
	const [ results, setResults ] = useState([])

	async function handle(query){
		if(query.length >= 3 ){
			const data = await fetch(`./api/search?query=${ query }`, { method: 'GET' }).then( async result => await result.json() ).catch( err => { setOptions([]) })
			setOptions(data)
		}else{
			setOptions([])
		}
	}

	async function submit(query){
		if(query.length === 0){
			setResults([])
			setOptions([])
		}else{
			router.push(`/search?q=${ query }`, undefined, { shallow: true })
			const data = await fetch(`./api/search?query=${ query }&description=true`, { method: 'GET' }).then( async result => await result.json() ).catch( err => { setResults([]) })
			setResults(data)
		}
	}

	useEffect(()=>{
		if( query && query.length > 0){
			handle(query)
		} else{
			setOptions([])
		}
	}, [ query ])

	return (
		<>
			<Main>
				<Head>
					<title>{ query ? `Buscando por ${ query }` : "Busca" } • Biblioteca de Tóquio</title>
				</Head>
				<ViewBlock.Header title={ "Busca" }/>
				<Breadcumbs data={ [ { text: "Início", href: "/" }, { text: "Busca", active: true } ] } />
				<Autocomplete data={ options } startValue={ query } onChange={ value => setQuery(value) } onSubmit={ submit } />
				{ query && <Caption>Resultados para <em>&quot;{ query }&quot;</em> ({ results.length })</Caption> }
				<Resume.Holder>
					{ results.map( item => <Resume.Item key={ item._id } data={ item } />) }
					{ ( results.length === 0 ) && <Resume.Empty /> }
				</Resume.Holder>
			</Main>
		</>
	)
}

Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}