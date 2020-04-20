import { isEmpty } from 'react-redux-firebase'

export default function getCorrespondingSubItem(item, selectedVariants){
    let sub = {}

    if(item && selectedVariants){
        const { subItems, variants } = item

        if(!(subItems)){
            return sub
        }

        if(!variants || variants.length===0) {
            if(subItems.length === 1){
                return { ...subItems[0], id: 0 }
            }
            return sub
        }


        for (let i = 0; i < subItems.length; i++) {
            sub = subItems[i]
            const subItemVariants = subItems[i].variants;
            for (let j = 0; j < subItemVariants.length; j++) {
                const title = variants[j].title

                if(!(subItemVariants[j] === selectedVariants[title])){
                    sub = {}
                }
            }
            if (!isEmpty(sub)) {
                return sub.variants ? { ...sub, id: i} : {}
            }
        }
    }

    return sub
}

// export default function getCorrespondingSubItem(subItems, variants){
//     let sub = {}

//     if(subItems && variants){
//         const subKeyArray = Object.keys(subItems)
//         for (let i = 0; i < subKeyArray.length; i++) {
//             const subItemId = subKeyArray[i];
//             sub = subItems[subItemId]
//             const subItemVariants = subItems[subItemId].variants;
//             for (let j = 0; j < subItemVariants.length; j++) {
//                 const {title, attribute} = subItemVariants[j];
//                 if(!(variants[title] === attribute)){
//                     sub = {}
//                 }
//             }
//             if(!isEmpty(sub)){
//                 return { ...sub , id: subItemId }
//             }
//         }
//     }

//     return sub
// }