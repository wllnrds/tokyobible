import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 't8yrrrlj',
    dataset: 'production',
    useCdn: false,
    apiVersion: 'v2021-10-21'
})