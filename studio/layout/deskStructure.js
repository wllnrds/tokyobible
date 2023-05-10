export default ( S ) => {
    const layout = S.list().title('Content').items([
        S.documentTypeListItem('rule'),
        S.documentTypeListItem('ruleGroup'),
        S.divider(),
        S.documentTypeListItem('source'),
        S.documentTypeListItem('contentType'),
        S.listItem().title('Rules by Content Type')
            .child(
            S.documentTypeList('contentType').title('Content Types').child(typeId =>
                S.documentTypeList('rule').title('Rules')
                    .filter( '_type == "rule" && $typeId == type._ref' ).params({ typeId })
                )
            )
    ])
    
    return layout
}