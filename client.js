import { createClient } from '@sanity/client'

export default createClient({
    projectId: 't8yrrrlj',
    dataset: 'production',
    useCdn: false,
    apiVersion: 'v2021-10-21'
})