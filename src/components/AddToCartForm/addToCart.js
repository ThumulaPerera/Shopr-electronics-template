import { isEmpty } from 'react-redux-firebase'
import { toastr } from 'react-redux-toastr'

export const addToCart = (values, dispatch, props) => {

    console.log(props)
    const { selectedSubItem, selectedValues, buyerId, firestore, storeId, itemId, reset, signIn, stockEnabled } = props
    console.log(selectedSubItem.stock)

    //same variable is used in form as well
    let addToCartDisabled =  
        isEmpty(selectedSubItem) ||
        !selectedSubItem.stock ||
        selectedSubItem.stock === 0 ||
        (selectedValues.quantity > selectedSubItem.stock && stockEnabled)

    if(!buyerId){
        toastr.error('Sign In to add items to cart')
        signIn()
        return
    }

    if(addToCartDisabled) {
        toastr.error('Adding item disabled')
        return
    }

    toastr.warning('Adding item....', 'Adding item to cart. Do not refresh the page')

    const orderItem = {
        item : itemId,
        noOfItems : parseInt(selectedValues.quantity),
        subItem : selectedSubItem.id,
        unitPrice : selectedSubItem.price
    }

    return firestore
        .collection('Stores')
        .doc(storeId)
        .collection('Buyers')
        .doc(buyerId)
        .get()
    .then(dataSnapshot => {
        let cart = dataSnapshot.get('cart')
        return cart ? cart : []
    })
    .then(cart => {
        cart.forEach(item => {
            if(orderItem.item === item.item && orderItem.subItem === item.subItem){
                throw new Error("A similar item is already in cart. Change its quantity instead")
            }
        });
        cart.push(orderItem)
        console.log(cart)
        return firestore
        .collection('Stores')
        .doc(storeId)
        .collection('Buyers')
        .doc(buyerId)
        .update({ 'cart' : cart})
    })
    .then(() => {
        toastr.success('Added to cart', 'Navigate to the cart tab to view your cart')
        reset()
    })
    .catch((error) => {
        toastr.error('Could not add item', error.message)
    })
}