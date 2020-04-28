import React from 'react';
import { Container, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import calculateDiscount from '../../helpers/calculateDiscount';

function CurrencyLabel({ currency, price, discount }) {
  const discountValue = calculateDiscount(price, discount);

  return (
    <Container textAlign="center">
      <Label color="red" tag size="large">
        {discountValue !== 0
                    && (
                    <p style={{ textDecoration: 'line-through', fontSize: '1rem' }}>
                      {' '}
                      <Icon name="money bill alternate outline" />
                      {' '}
                      {currency}
                      {' '}
                      {price.toFixed(2)}
                      {' '}
                    </p>
                    )}
        <p>
          {' '}
          <Icon name="money bill alternate outline" />
          {' '}
          {currency}
          {' '}
          {(price - discountValue).toFixed(2)}
          {' '}
        </p>
      </Label>
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
