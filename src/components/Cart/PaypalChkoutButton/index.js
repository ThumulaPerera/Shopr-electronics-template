/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import PropTypes from 'prop-types';

class PayPalChkoutButton extends Component {
  render() {
    // paypal options config
    const clientId = 'AR3wRLp2Ko1i5gs2dfOUWK__PF4B3iUcjKO9flWsIWR5s6vmfN6ljOBu-sB2rNmzXxWiJhz5pSH2C04p';
    const locale = 'en_US';

    const {
      currency,
      total,
      updateStock,
      resetStock,
      createOrderInDb,
      items,
      cart,
      stockEnabled,
      merchantId,
    } = this.props;

    const style = {
      layout: 'vertical',
      color: 'gold',
      shape: 'rect',
      label: 'paypal',
      size: 'responsive', // min width is 100px
    };

    const onSuccess = (details, data) => {
      // Congratulation, it came here means everything's fine!
      console.log('The payment was succeeded!', details);
      console.log('data', data);
      createOrderInDb(items, cart, details);
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      if (stockEnabled) {
        resetStock(items, cart);
      }
      console.log('The payment was cancelled!', data);
    };

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      if (stockEnabled) {
        resetStock(items, cart);
      }
      console.log('Error!', err);
    };

    const createOrder = (data, actions) => {
      if (stockEnabled) {
        updateStock(items, cart);
      }
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: total,
            },
          },
        ],
      // application_context: {
      //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
      // }
      });
    };

    return (
      <PayPalButton
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
        createOrder={createOrder}
        style={style}
        options={{
          clientId,
          merchantId,
          locale,
          currency,
          disableFunding: 'card',
        }}
      />
    );
  }
}

export default PayPalChkoutButton;

PayPalChkoutButton.propTypes = {
  currency: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  updateStock: PropTypes.func.isRequired,
  resetStock: PropTypes.func.isRequired,
  createOrderInDb: PropTypes.func.isRequired,
  stockEnabled: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  merchantId: PropTypes.string.isRequired,
};
