import calculateDiscount from './calculateDiscount';

export default function calculateCartTotal(items, cart) {
  let total = 0;
  if (items && Array.isArray(cart)) {
    cart.map((orderItem) => {
      let itemId;
      if (typeof orderItem.item === 'string') {
        itemId = orderItem.item;
      } else {
        throw new TypeError('orderItem.item should be a string');
      }

      let subItemId;
      if (Number.isInteger(orderItem.subItem) && orderItem.subItem >= 0) {
        subItemId = orderItem.subItem;
      } else {
        throw new TypeError('orderItem.subItem should be a non negative integer');
      }

      let item;
      if (items[itemId]) {
        item = items[itemId];
      } else {
        throw new Error('Item matching the itemId is not in items');
      }

      let subItems;
      if (Array.isArray(item.subItems)) {
        subItems = item.subItems;
      } else {
        throw new TypeError('item.subItems should be an array');
      }

      let subItem;
      if (subItems[subItemId]) {
        subItem = subItems[subItemId];
      } else {
        throw new Error('subItem matching the subItemId is not in subItems');
      }

      let price;
      if (typeof subItem.price === 'number') {
        price = subItem.price;
      } else {
        throw new TypeError('price should be a number');
      }

      const discountValue = calculateDiscount(price, item.discount);

      let noOfItems;
      if (typeof orderItem.noOfItems === 'number') {
        noOfItems = orderItem.noOfItems;
      } else {
        throw new TypeError('no of items should be a number');
      }

      total += (price - discountValue) * noOfItems;
      return null;
    });
    return total;
  }
  throw new TypeError('items, cart cannot be null and cart must be an array');
}
