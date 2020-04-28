import calculateDiscount from './calculateDiscount';

export default function calculateCartTotal(items, cart) {
  let total = 0;
  if (items && cart) {
    cart.map((orderItem) => {
      const { price } = items[orderItem.item].subItems[orderItem.subItem];
      const discountValue = calculateDiscount(price, items[orderItem.item].discount);
      total += (price - discountValue) * orderItem.noOfItems;
      return null;
    });
  }
  return total;
}
