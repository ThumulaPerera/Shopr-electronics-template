import { toastr } from 'react-redux-toastr';
import { CART_ACTION_TYPES } from '../constants/actionTypes';

export const removeItem = (firestore, itemIndex, storeId, buyerId) => (dispatch) => {
  dispatch({ type: CART_ACTION_TYPES.DELETE_IN_PROGRESS });
  return firestore
    .collection('Stores')
    .doc(storeId)
    .collection('Buyers')
    .doc(buyerId)
    .get()
    .then((dataSnapshot) => {
      const cart = dataSnapshot.get('cart');
      return cart || [];
    })
    .then((cart) => {
      cart.splice(itemIndex, 1);
      console.log(cart);
      return firestore
        .collection('Stores')
        .doc(storeId)
        .collection('Buyers')
        .doc(buyerId)
        .update({ cart });
    })
    .then(() => {
      dispatch({ type: CART_ACTION_TYPES.DELETE_SUCCESS });
      toastr.success('Item successfully removed from cart');
    })
    .catch((error) => {
      dispatch({ type: CART_ACTION_TYPES.DELETE_ERROR, error });
      toastr.error('Could not remove item', error.message);
    });
};

// eslint-disable-next-line max-len
export const editItemQuantity = (firestore, itemIndex, newQantity, storeId, buyerId) => (dispatch) => {
  dispatch({ type: CART_ACTION_TYPES.EDIT_IN_PROGRESS });
  return firestore
    .collection('Stores')
    .doc(storeId)
    .collection('Buyers')
    .doc(buyerId)
    .get()
    .then((dataSnapshot) => {
      const cart = dataSnapshot.get('cart');
      return cart || [];
    })
    .then((cart) => {
      if (newQantity) {
        // eslint-disable-next-line no-param-reassign
        cart[itemIndex].noOfItems = newQantity;
      }
      console.log(cart);
      return firestore
        .collection('Stores')
        .doc(storeId)
        .collection('Buyers')
        .doc(buyerId)
        .update({ cart });
    })
    .then(() => {
      dispatch({ type: CART_ACTION_TYPES.EDIT_SUCCESS });
      toastr.success('Item quantity successfully changed');
    })
    .catch((error) => {
      dispatch({ type: CART_ACTION_TYPES.EDIT_ERROR, error });
      toastr.error('Could not change the quantity', error.message);
    });
};
