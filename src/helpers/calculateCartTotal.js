//discounts has not been considered

export default function calculateCartTotal( items, cart ){
    let total = 0
    if (items && cart) {
        cart.map((orderItem, key) => {
            let price = items[orderItem.item].subItems[orderItem.subItem].price 
            total += price * orderItem.noOfItems
            return
        })
    }
    return total
}