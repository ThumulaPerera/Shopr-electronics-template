// takes in an object of items, array of categories, string of selectedCategory
// returns an object with array of all items belonging to selected category
//    and a string representing the category icon
// returns { itemsOfSelectedCategory: [], categoryIcon: undefined } for invalid params

export default function getItemsAndIconByCategory(items, categories, selectedCategory) {
  const itemsOfSelectedCategory = [];
  let selectedCategoryID;
  let categoryIcon;

  if (Array.isArray(categories)) {
    categories.map(({ name, icon }, key) => {
      if (name === selectedCategory) {
        selectedCategoryID = key;
        categoryIcon = icon;
      }
      return null;
    });

    if (items) {
      Object.keys(items).map((key) => {
        const item = items[key];
        const itemCategoryID = item.category;
        if (itemCategoryID !== undefined
          && selectedCategoryID !== undefined
          && itemCategoryID === selectedCategoryID) {
          itemsOfSelectedCategory.push(item);
        }
        return null;
      });
    }
  }

  return { itemsOfSelectedCategory, categoryIcon };
}
