import { toastr } from 'react-redux-toastr';

import { CART_ACTION_TYPES } from '../constants/actionTypes';
import calculateCartTotal from '../helpers/calculateCartTotal';
import calculateDiscount from '../helpers/calculateDiscount';

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
      // console.log(cart);
      cart.splice(itemIndex, 1);
      // console.log(cart);
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
      // console.log(cart);
      if (newQantity) {
        // eslint-disable-next-line no-param-reassign
        cart[itemIndex].noOfItems = newQantity;
      }
      // console.log(cart);
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

// eslint-disable-next-line no-unused-vars
export const updateStock = (firestore, storeId, items, cart) => (dispatch) => {
  dispatch({ type: CART_ACTION_TYPES.CHECKOUT_IN_PROGRESS });

  const batch = firestore.batch();
  // eslint-disable-next-line array-callback-return
  cart.map((cartItem) => {
    const { subItems } = items[cartItem.item];
    // console.log(subItems);
    const newStock = subItems[cartItem.subItem].stock - cartItem.noOfItems;
    subItems[cartItem.subItem].stock = newStock;

    const itemDocRef = firestore
      .collection('Stores')
      .doc(storeId)
      .collection('Items')
      .doc(cartItem.item);

    batch.update(itemDocRef, { subItems });
  });
  return batch.commit()
    .catch((error) => {
      dispatch({ type: CART_ACTION_TYPES.CHECKOUT_ERROR, error });
      // console.log(error);
    });
};


// eslint-disable-next-line no-unused-vars
export const resetStock = (firestore, storeId, items, cart) => (dispatch) => {
  const batch = firestore.batch();
  // eslint-disable-next-line array-callback-return
  cart.map((cartItem) => {
    const { subItems } = items[cartItem.item];
    // console.log(subItems);
    const newStock = subItems[cartItem.subItem].stock + cartItem.noOfItems;
    subItems[cartItem.subItem].stock = newStock;

    const itemDocRef = firestore
      .collection('Stores')
      .doc(storeId)
      .collection('Items')
      .doc(cartItem.item);

    batch.update(itemDocRef, { subItems });
  });
  return batch.commit()
    .then(() => {
      dispatch({ type: CART_ACTION_TYPES.CHECKOUT_CANCEL });
    })
    .catch((error) => {
      dispatch({ type: CART_ACTION_TYPES.CHECKOUT_ERROR, error });
      // console.log(error);
    });
};

// eslint-disable-next-line
export const createOrderInDb = (firestore, storeId, buyerId, items, cart, paymentDetails) => (dispatch) => {
  const batch = firestore.batch();

  const date = firestore.Timestamp.now();
  const shippingAddress = paymentDetails.purchase_units[0].shipping;
  const { id } = paymentDetails;

  // to accomodate for existing item discounts
  const discountedCart = cart.map((cartItem) => {
    const {
      item, subItem, noOfItems, unitPrice,
    } = cartItem;
    return {
      item,
      subItemId: subItem,
      noOfItems,
      unitPrice: unitPrice - calculateDiscount(unitPrice, items[item].discount),
    };
  });

  // eslint-disable-next-line array-callback-return
  discountedCart.map((cartItem) => {
    const {
      item, subItemId, noOfItems, unitPrice,
    } = cartItem;

    const purchase = {
      date,
      unitPrice,
      noOfItems,
      subItem: subItemId,
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
    date,
    orderItems: discountedCart,
    orderState: [
      {
        date,
        stateId: 0,
      },
    ],
    paymentMethod: 'paypal',
    shippingAddress,
    totalPrice: calculateCartTotal(items, cart),
  };

  const OrderDocRef = firestore
    .collection('Stores')
    .doc(storeId)
    .collection('Orders')
    .doc(id);

  batch.set(OrderDocRef, order);

  const BuyerDocRef = firestore
    .collection('Stores')
    .doc(storeId)
    .collection('Buyers')
    .doc(buyerId);

  batch.update(BuyerDocRef, { cart: [] });

  return batch.commit()
    .then(() => {
      dispatch({ type: CART_ACTION_TYPES.CHECKOUT_SUCCESS });
      toastr.success('Checkout complete');
      // console.log('done');
    })
    .catch((error) => {
      dispatch({ type: CART_ACTION_TYPES.CHECKOUT_ERROR, error });
      // remove error message ?
      toastr.error('Checkout failed', 'If money is deducted from your paypal account, please contact the store for a refund');
      // console.log('error', error);
    });
};
