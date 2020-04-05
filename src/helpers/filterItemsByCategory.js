export default function filterItemsByCategory(items, categories, selectedCategory){
    let itemsOfSelectedCategory = {};
    let selectedCategoryID
    categories.map(({ name }, key) => {
        if (name === selectedCategory) {
            selectedCategoryID = key;
        }
    })

    Object.keys(items).map(key => {
        const item = items[key]
        const itemCategoryID = item.category
        if (itemCategoryID == selectedCategoryID) {
            itemsOfSelectedCategory = { ...itemsOfSelectedCategory, item }
        }
    })

    return itemsOfSelectedCategory;
}