import slugify from 'slugify'
import { MdBook } from 'react-icons/md'

function asyncSlugifier( input, schemaType, context ) {
    let slug = slugify(input).toLowerCase().slice(0, 100)
    const query = 'count(*[_type=="source" && slug.current == $slug]{_id})'
    const params = { slug: slug }
    
    const { getClient } = context
    const client = getClient({apiVersion: '2022-12-07'})

    return client.fetch(query, params).then(count => {
        if(count > 0){
            return `${slug}-${count + 1}`
        }else{
            return `${slug}`
        }
    })
}

export default {
    name: 'source',
    type: 'document',
    title: 'Sources',
    icon: MdBook,
    fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'type', title: 'Type', type: 'reference', to: [{type: 'contentType'}], options: { filter: '$type in settedFor', filterParams: { type: 'source' } }  },
        { name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              slugify: asyncSlugifier
            }
        }
    ]
}