/* eslint-disable max-len */
import React, { Component } from 'react';
import PaypalBtn from 'react-paypal-checkout';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class CheckoutButton extends Component {
  render() {
    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      console.log('The payment was succeeded!', payment);
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log('The payment was cancelled!', data);
    };

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log('Error!', err);
    };

    const env = 'sandbox'; // you can set here to 'production' for production
    const { currency, total } = this.props;
    const locale = 'en_US';
    // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
    const style = {
      label: 'pay',
      tagline: false,
      size: 'medium',
      shape: 'pill',
      color: 'gold',
    };

    const client = {
      sandbox: 'AR3wRLp2Ko1i5gs2dfOUWK__PF4B3iUcjKO9flWsIWR5s6vmfN6ljOBu-sB2rNmzXxWiJhz5pSH2C04p',
      production: 'YOUR-PRODUCTION-APP-ID',
    };
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    return (
      <PaypalBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        shipping={2}
        locale={locale}
        style={style}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}

export default CheckoutButton;

CheckoutButton.propTypes = {
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};
