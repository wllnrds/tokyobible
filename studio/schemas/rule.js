import slugify from 'slugify'
import { MdExtension } from 'react-icons/md'

function slugifier(input, schemaType, context) {
    const slug = slugify(input).toLowerCase().slice(0, 100)
    const query = 'count(*[_type=="rule" && slug.current == $slug]{_id})'
    const params = { slug }
    
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
    name: 'rule',
    type: 'document',
    title: 'Rules',
    icon: MdExtension,groups: [
        { name: 'basics', title: 'Basics' },
        { name: 'about', title: 'About' },
        { name: 'attributes', title: 'Attributes' },
        { name: 'others', title: 'Other' },
    ],
    fields: [
        { name: 'name', title: 'Name', type: 'string', group: 'basics' },
        { name: 'type', title: 'Type', type: 'reference', to: [{type: 'contentType'}], group: 'basics',
            options: { filter: '$type in settedFor', filterParams: { type: 'rule' } }
        },
        { name: 'value', title: 'Value', type: 'number', initialValue: 0, group: 'basics' },
        { name: 'frequency', title: 'Frequency', type: 'number', initialValue: 999, group: 'attributes'  },
        { name: 'description', title: 'Description' , type: 'array', group: 'basics' , 
            of: [{
                type: 'block', marks: {
                    annotations: [
                      {
                        name: 'internalLink', type: 'object', title: 'Internal link',
                        fields: [
                          {
                            name: 'reference', type: 'reference', title: 'Reference', weak: true,
                            blockEditor: { icon: ()=>"..." },
                            to: [ { type: 'rule' }, { type: 'ruleGroup' }, { type: 'contentType' }, { type: 'source' }, ]
                          }
                        ]
                      }
                    ]
                  }
            }]
        },
        { name: 'group', title: 'Group', type: 'reference', group: 'basics', to:[{ type: 'ruleGroup' }] },
        { name: 'slug', title: 'Slug', type: 'slug', group: 'basics',
            options: {
              source: ( doc ) => {
                if(doc.group && doc.group._ref){
                    const queryGroup = '*[_type=="ruleGroup" && _id == $group][0]{ name }'
                    const params = { group: doc.group._ref }
                    return sanityClient.fetch(queryGroup, params).then( res => {
                        return `${ res.name }_${ doc.name }`
                    })
                }else{
                    return `${ doc.name }`
                }
              },
              slugify: slugifier
            }
        },
        { name: 'cost', title: "Cost", type: 'string', group: 'attributes' },
        { name: 'gain', title: "Gain", type: 'string', group: 'attributes' },
        { name: 'heritage', title: 'Heritage', type: 'array', group: 'about',
            hidden: ({ document }) => {
                if(!document?.type?._ref){
                    return true
                }else{
                    return document?.type?._ref !== 'b5aff73b-42a8-4cd0-b488-034e2ea53e68'
                }
            },
            of: [{ type: 'object', fields: [
                { name: 'rule', title: 'Rule', type: 'reference', to: [{ type: 'rule'}] },
                { name: 'note', title: 'Note', type: 'string' }
            ]}]
        },
        { name: 'origin', type: 'array', group: 'basics',
            of:[{
                title: 'Origin', type: 'object',
                fields: [
                    { name: 'source', title: 'Source', type: 'reference', to: [{ type: 'source' }] },
                    { name: 'page', title: 'Page', type: 'string' }
                ],
                preview: {
                    select: {
                        source: 'source.name',
                        page: 'page'
                    },
                    prepare(selection){
                        const { source, page } = selection;
                        return {
                            title: `${ source } p.${ page }`
                        }
                    }
                }
            }]
        },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, group: 'others' },
        { name: 'restriction', title: 'Restriction', type: 'array', of: [{ type: 'reference', weak: true, to: [ { type: 'rule' } ] }], group: 'others' },
    ],
    orderings: [ { title: 'Name', name: 'nameAsc', by: [ { field: 'slug.current', direction: 'asc' } ] } ],
    preview: {
        select: { name: 'name', type: 'type.name', value: 'value', group: 'group.name', extra: 'group.value' },
        prepare(selection){
            const { name, type, value, group, extra } = selection;
            let title;
            let cost;

            if( !value && value !== 0 ){ cost = `(não comprável)` }
            else if( !group ){ cost = `(${value})` }
            else{ cost = `(${ value + extra })` }

            if(!group){
                cost
                title = `${ name } ${ cost }`
            } else {
                title = `${ group } :: ${ name } ${ cost }`
            }

            return { 
                title,
                subtitle: type
            }
        }
    }
}