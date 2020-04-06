export default function getItemsAndIconByCategory(items, categories, selectedCategory){
    let itemsOfSelectedCategory = {};
    let selectedCategoryID, categoryIcon
    categories.map(function({ name, icon }, key){
        if (name === selectedCategory) {
            selectedCategoryID = key;
            categoryIcon = icon;
        }
    })

    Object.keys(items).map(function(key){
        const item = items[key]
        const itemCategoryID = item.category
        if (itemCategoryID === selectedCategoryID) {
            itemsOfSelectedCategory = { ...itemsOfSelectedCategory, item }
        }
    })

    return { itemsOfSelectedCategory, categoryIcon };
}