import { isEmpty } from 'react-redux-firebase'

export default function getCorrespondingSubItem(subItems, variants){
    let sub = {}

    if(subItems && variants){
        const subKeyArray = Object.keys(subItems)
        for (let i = 0; i < subKeyArray.length; i++) {
            const subItemId = subKeyArray[i];
            sub = subItems[subItemId]
            const subItemVariants = subItems[subItemId].variants;
            for (let j = 0; j < subItemVariants.length; j++) {
                const {title, attribute} = subItemVariants[j];
                if(!(variants[title] === attribute)){
                    sub = {}
                }
            }
            if(!isEmpty(sub)){
                return { ...sub , id: subItemId }
            }
        }
    }

    return sub
}