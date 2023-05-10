import { MdGroupWork } from 'react-icons/md'

export default {
    name: 'ruleGroup',
    type: 'document',
    title: "Rule's Group",
    icon: MdGroupWork,
    fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'type', title: 'Type', type: 'reference', to: [{type: 'contentType'}], options: { filter: '$type in settedFor', filterParams: { type: 'ruleGroup' } } },
        { name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]},
        { name: 'value', title: 'Value', type: 'number', initialValue: 0 },
        { name: 'frequency', title: 'Frequency', type: 'number', initialValue: 999  },
        { name: 'setSize', title: 'Set of', type: 'number', initialValue: 1 }
    ],
    orderings: [
        {
            title: 'Name',
            name: 'nameAsc',
            by: [
                {field: 'name', direction: 'asc'}
            ]
        }
    ]
  }