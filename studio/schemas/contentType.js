import { MdSell } from 'react-icons/md'

export default {
    name: 'contentType',
    type: 'document',
    title: 'Content Types',
    icon: MdSell,
    fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
        { name: 'color', title: 'Color', type: 'string' },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 200,
              slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
            }
        },
        { 
            name: 'settedFor', title: "Setted for", type: 'array', of: [{ type: 'string' }], 
            options : { list: [
                { title: "Rules", value : "rule" },
                { title: "Source", value : "source" },
                { title: "Rule Groups", value : "ruleGroup" }
            ] }
        },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        { name: 'indexed', title: 'Indexed', type: 'boolean', default: false }
    ]
}