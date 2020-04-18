import * as moment from 'moment';

export default function calculateDiscount( price, discount ){
    let discountValue = 0
    if (discount) {
        let startDate = discount.startDate ? moment(discount.startDate.toDate()) : null
        let endDate = discount.endDate ? moment(discount.endDate.toDate()) : null
        let currentDate = moment()

        if (startDate && startDate.isBefore(currentDate) && endDate && endDate.isAfter(currentDate) && discount.percentage){
            discountValue = price * discount.percentage / 100
            console.log(discountValue)
        }
    }
    return discountValue
}