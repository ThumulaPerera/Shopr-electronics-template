import * as moment from 'moment';

export default function calculateDiscount(price, discount) {
  let discountValue = 0;
  if (discount) {
    const startDate = discount.startDate ? moment(discount.startDate.toDate()) : null;
    const endDate = discount.endDate ? moment(discount.endDate.toDate()) : null;
    const currentDate = moment();

    if (startDate
        && startDate.isBefore(currentDate)
        && endDate
        && endDate.isAfter(currentDate)
        && discount.percentage) {
      discountValue = price * (discount.percentage / 100);
    }
  }
  return discountValue;
}
