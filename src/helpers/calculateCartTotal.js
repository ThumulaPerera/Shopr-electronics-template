import calculateDiscount from './calculateDiscount'

export default function calculateCartTotal( items, cart ){
    let total = 0
    if (items && cart) {
        cart.map((orderItem, key) => {
            const price = items[orderItem.item].subItems[orderItem.subItem].price 
            const discountValue = calculateDiscount(price, items[orderItem.item].discount) 
            total += (price - discountValue) * orderItem.noOfItems
            return
        })
    }
    return total
}