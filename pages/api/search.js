import groq from 'groq';
import client from '../../client';

const query_default = groq`*[_type == "rule" && ( name match $query + "*" || group->name match $query + "*" || type->name match $query ) ][0...10]{ 
	_id, 
	"name" : coalesce(group->name + " :: ", "") + name ,
	"group": group->name,
	"type": type -> name,
	"type_slug" : type->slug.current,
	"slug": slug.current
	} | order(slug)`;

const query_2 = groq`*[_type == "rule" && ( name match $query + "*" || group->name match $query + "*" || type->name match $query )][0...10]{ 
	_id, 
	description,
	"name" : coalesce(group->name + " :: ", "") + name ,
	"group": group->name,
	"type": type -> name,
	"type_slug" : type->slug.current,
	"slug": slug.current
	} | order(slug)`;

export default async function handle(req, res){
    let { query, description } = req.query
	let data = await client.fetch( (description) ? query_2 : query_default, { query });
    return res.json(data)
}