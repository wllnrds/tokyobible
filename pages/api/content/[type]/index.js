import groq from 'groq';
import client from '/client';

const query_default = groq`*[_type == $type]{ 
	_id, 
	"name" : coalesce(group->name + " :: ", "") + name ,
	"group": group->name,
	"type": type -> name,
	"type_slug" : type->slug.current,
	"slug": slug.current
	}`;

export default async function handle(req, res){
    let { type } = req.query

    console.log( type )
	let data = await client.fetch( query_default, { type } );
    return res.json(data)
}