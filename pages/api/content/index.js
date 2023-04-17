import groq from 'groq';
import client from '/client';

const query_default = groq`array::unique(*{ _type }._type)`;

export default async function handle(req, res){
	let data = await client.fetch( query_default );
    return res.json(data)
}