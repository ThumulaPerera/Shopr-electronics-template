import { isEmpty } from 'react-redux-firebase';

// takes in an item object && object of selectedVariants as input
// returns the selected subitem from the subItems of the item
// returns {} if invalid prams given

export default function getCorrespondingSubItem(item, selectedVariants) {
  let sub = {};

  if (item && selectedVariants) {
    const { subItems, variants } = item;

    if (!Array.isArray(subItems)) {
      return sub;
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      if (subItems.length === 1) {
        return { ...subItems[0], id: 0 };
      }
      return sub;
    }

    for (let i = 0; i < subItems.length; i++) {
      sub = subItems[i];
      const subItemVariants = subItems[i].variants;
      for (let j = 0; j < subItemVariants.length; j++) {
        const { title } = variants[j];

        if (!(subItemVariants[j] === selectedVariants[title])) {
          sub = {};
        }
      }
      if (!isEmpty(sub)) {
        return sub.variants ? { ...sub, id: i } : {};
      }
    }
  }

  return sub;
}
