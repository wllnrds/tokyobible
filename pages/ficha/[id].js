import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Input from '../../components/input'
import Layout, { Page as ContentPage, Main, Breadcumbs, ViewBlock } from '../../components/layout'
import styles from './criar.module.scss'

export default function Page() {
	const [ level, setLevel ] = useState(null)
	const [ points, setPoints ] = useState(null)
	const [ name, setName ] = useState('')

	const levelIndex = {
		"comum": [0,1,2,3,4],
		"novato": [5,6],
		"lutador": [7,8,9],
		"campeao": [10,11],
		"lenda": [12]
	}

	function selectLevel(tag){
		if(level === tag){
			setPoints(null)
			setLevel(null)
		}else{
			setLevel(tag)
		}
	}

	function selectPoint(point){
		setPoints(point)
	}

	function nameChange(name){
		setName(name)
	}

	return (
		<Main>
			<Head>
				<title>Nova ficha • Biblioteca de Tóquio</title>
			</Head>
			<ViewBlock.Header title={ "Novo personagem" }/>
			<ContentPage.Description>
				<p>Vai começar a criação do seu personagem. Que tal começar pelo nome?</p>
			</ContentPage.Description>
			<Input.Text label='Nome do personagem' onChange={ nameChange } />
			<Input.ChooseList label="Qual o nível do seu personagem?">
				<Input.ItemList title="Pessoa Comum" onClick={ () => selectLevel('comum') } hide={ level && 'comum' !== level } info="0-4 pontos" selected={ level === 'comum' }>
					<p>Estas pessoas têm poder de combate quase nulo. Quase nunca têm alguma característica acima de 1 (quase todas são zero). A maioria tem uma perícia ou especialização (sua profissão). Podem ter uma ou duas vantagens, e apenas uma desvantagem suave (de –1 ponto). Não use para personagens jogadores.</p>
				</Input.ItemList>
				<Input.ItemList title="Novato" onClick={ () => selectLevel('novato') } hide={ level && 'novato' !== level } info="5-6 pontos" selected={ level === 'novato' }>
					<p>Você é um herói ainda em começo de carreira. Esta é a pontuação típica para começar aventuras medievais. Você pode ter até –3 pontos em desvantagens.</p>
				</Input.ItemList>
				<Input.ItemList title="Lutador" onClick={ () => selectLevel('lutador') } hide={ level && 'lutador' !== level } info="7-9 pontos" selected={ level === 'lutador' }>
					<p>Você já tem certa experiência como aventureiro. Pode ter até –4 pontos em desvantagens.</p>
				</Input.ItemList>
				<Input.ItemList title="Campeão" onClick={ () => selectLevel('campeao') } hide={ level && 'campeao' !== level } info="10-11 pontos" selected={ level === 'campeao' }>
					<p>Você teve muitas vitórias na carreira. Pode ter até –5 pontos em desvantagens.</p>
				</Input.ItemList>
				<Input.ItemList title="Lenda" onClick={ () => selectLevel('lenda') } hide={ level && 'lenda' !== level } info="12 pontos" selected={ level === 'lenda' }>
					<p>Você já conquistou seu lugar entre os melhores do mundo, talvez nem existam heróis mais poderosos (mas certamente há vilões). Esta é a pontuação máxima para um personagem jogador recém-criado. Pode ter até –6 pontos em desvantagens.</p>
				</Input.ItemList>
			</Input.ChooseList>

			{ 
				level && <div className={ styles.pointHolder }>
					<div className={ styles.header}>Pontuação inicial</div>
					<div className={ styles.list}>
						{
							levelIndex[level].map( item => 
								<div key={ `levelPointer-${ item }` } onClick={ () => selectPoint(item) } className={ `${ styles.item } ${ points === item ? styles.active : '' }` }>{ item }</div>
							)
						}
					</div>
				</div>
			}
			{ points && name && <Input.Submit>Criar Personagem</Input.Submit> }
		</Main>
	)
}


Page.getLayout = function getLayout(page) {
	return (
	  <Layout>
		{page}
	  </Layout>
	)
}