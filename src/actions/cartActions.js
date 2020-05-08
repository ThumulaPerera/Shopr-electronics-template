import { toastr } from 'react-redux-toastr';

import { CART_ACTION_TYPES } from '../constants/actionTypes';
import calculateCartTotal from '../helpers/calculateCartTotal';

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

// eslint-disable-next-line max-len
export const updateStock = (firestore, storeId, items, cart) => (dispatch) => {
  const batch = firestore.batch();
  cart.map((cartItem) => {
    const { subItems } = items[cartItem.item];
    console.log(subItems);
    const newStock = subItems[cartItem.subItem].stock - cartItem.noOfItems;
    subItems[cartItem.subItem].stock = newStock;

    const itemDocRef = firestore
      .collection('Stores')
      .doc(storeId)
      .collection('Items')
      .doc(cartItem.item);

    batch.update(itemDocRef, { subItems });
  });
  batch.commit()
    .then(() => {
      // dispatch({ type: CART_ACTION_TYPES.EDIT_SUCCESS });
      // toastr.success('Item quantity successfully changed');
    })
    .catch((error) => {
      // dispatch({ type: CART_ACTION_TYPES.EDIT_ERROR, error });
      // toastr.error('Err in run transaction', error.message);
      console.log(error);
    });
};

// eslint-disable-next-line max-len
export const resetStock = (firestore, storeId, items, cart) => (dispatch) => {
  const batch = firestore.batch();
  cart.map((cartItem) => {
    const { subItems } = items[cartItem.item];
    console.log(subItems);
    const newStock = subItems[cartItem.subItem].stock + cartItem.noOfItems;
    subItems[cartItem.subItem].stock = newStock;

    const itemDocRef = firestore
      .collection('Stores')
      .doc(storeId)
      .collection('Items')
      .doc(cartItem.item);

    batch.update(itemDocRef, { subItems });
  });
  batch.commit()
    .then(() => {
      // dispatch({ type: CART_ACTION_TYPES.EDIT_SUCCESS });
      // toastr.success('Item quantity successfully changed');
    })
    .catch((error) => {
      // dispatch({ type: CART_ACTION_TYPES.EDIT_ERROR, error });
      // toastr.error('Err in run transaction', error.message);
      console.log(error);
    });
};

// eslint-disable-next-line max-len
export const createOrderInDb = (firestore, storeId, buyerId, items, cart) => (dispatch) => {
  const batch = firestore.batch();
  cart.map((cartItem) => {
    const {
      item, subItem, noOfItems, unitPrice,
    } = cartItem;
    // const { subItems } = items[cartItem.item];
    // console.log(subItems);
    // const newStock = subItems[cartItem.subItem].stock + cartItem.noOfItems;
    // subItems[cartItem.subItem].stock = newStock;
    const purchase = {
      date: null, // TODO include date
      unitPrice, // TODO change later to accomodate discounted price
      noOfItems,
      subItem,
      buyer: buyerId,
    };

    const PurchaseDocRef = firestore
      .collection('Stores')
      .doc(storeId)
      .collection('Items')
      .doc(item)
      .collection('Purchases')
      .doc();

    batch.set(PurchaseDocRef, purchase);
  });

  const order = {
    buyer: buyerId,
    date: null, // TODO include date
    orderItems: cart, // TODOchange this later to accomodate discounted price
    orderStates: [
      {
        date: null, // TODO include date
        stateId: 0,
      },
    ],
    paymentMethod: 'paypal',
    shippingAddress: null, // TODO get address from paypal data add here
    totalPrice: calculateCartTotal(items, cart),
  };

  const OrderDocRef = firestore
    .collection('Stores')
    .doc(storeId)
    .collection('Orders')
    .doc();

  batch.set(OrderDocRef, order);

  batch.commit()
    .then(() => {
      // dispatch({ type: CART_ACTION_TYPES.EDIT_SUCCESS });
      // toastr.success('Item quantity successfully changed');
      console.log('done');
    })
    .catch((error) => {
      // dispatch({ type: CART_ACTION_TYPES.EDIT_ERROR, error });
      // toastr.error('Err in run transaction', error.message);
      console.log(error);
    });
};
