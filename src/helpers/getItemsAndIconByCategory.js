export default function getItemsAndIconByCategory(items, categories, selectedCategory) {
  let itemsOfSelectedCategory = {};
  let selectedCategoryID; let
    categoryIcon;

  if (categories) {
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
        if (itemCategoryID === selectedCategoryID) {
          itemsOfSelectedCategory = { ...itemsOfSelectedCategory, [key]: item };
        }
        return null;
      });
    }
  }

  return { itemsOfSelectedCategory, categoryIcon };
}
