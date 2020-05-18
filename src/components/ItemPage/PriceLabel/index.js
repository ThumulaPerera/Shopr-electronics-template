import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import calculateDiscount from '../../../helpers/calculateDiscount';

function CurrencyLabel({ currency, price, discount }) {
  const discountValue = calculateDiscount(price, discount);

  return (
    <Container textAlign="center">
      {discountValue !== 0
        && (
        <p style={{ textDecoration: 'line-through', fontSize: '1rem', marginBottom: '0px' }}>
          {/* {' '}
          <Icon name="money bill alternate outline" /> */}
          {' '}
          {currency}
          {' '}
          {price.toFixed(2)}
          {' '}
        </p>
        )}
      <p style={{ fontSize: '1.4rem', color: 'red' }}>
        <b>
          {' '}
          <Icon name="money bill alternate outline" />
          {' '}
          {currency}
          {' '}
          {(price - discountValue).toFixed(2)}
          {' '}
        </b>
      </p>
    </Container>
  );
}

export default CurrencyLabel;

CurrencyLabel.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.object,
};

CurrencyLabel.defaultProps = {
  discount: null,
};
