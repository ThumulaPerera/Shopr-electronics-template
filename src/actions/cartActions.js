import { CART_ACTION_TYPES } from '../constants/actionTypes'
import { toastr } from 'react-redux-toastr'

export const removeItem = (firestore, itemIndex, storeId, buyerId) => {
    return (dispatch, getState) => {
        dispatch({type : CART_ACTION_TYPES.DELETE_IN_PROGRESS})
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
        cart.splice(itemIndex, 1)
        console.log(cart)
        return firestore
        .collection('Stores')
        .doc(storeId)
        .collection('Buyers')
        .doc(buyerId)
        .update({ 'cart' : cart})
    })
    .then(() => {
        dispatch({type : CART_ACTION_TYPES.DELETE_SUCCESS})
        toastr.success('Item successfully removed from cart')
    })
    .catch((error) => {
        dispatch({type : CART_ACTION_TYPES.DELETE_ERROR, error : error})
        toastr.error('Could not remove item', error.message)
    })
    }
}

export const editItemQuantity = (firestore, itemIndex, newQantity, storeId, buyerId) => {
    return (dispatch, getState) => {
        dispatch({type : CART_ACTION_TYPES.EDIT_IN_PROGRESS})
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
        if(newQantity){
            cart[itemIndex].noOfItems = newQantity
        }
        console.log(cart)
        return firestore
        .collection('Stores')
        .doc(storeId)
        .collection('Buyers')
        .doc(buyerId)
        .update({ 'cart' : cart})
    })
    .then(() => {
        dispatch({type : CART_ACTION_TYPES.EDIT_SUCCESS})
        toastr.success('Item quantity successfully changed')
    })
    .catch((error) => {
        dispatch({type : CART_ACTION_TYPES.EDIT_ERROR, error : error})
        toastr.error('Could not change the quantity', error.message)
    })
    }
}