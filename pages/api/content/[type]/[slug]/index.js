import groq from 'groq';
import client from '/client';

const query_default = groq`*[_type == $type && slug.current == $slug][0]`;

export default async function handle(req, res){
    let { type = 'rule', slug } = req.query
	let data = await client.fetch( query_default, { type, slug });
    return res.json(data)
}