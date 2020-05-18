import React from 'react';
import { Container, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function InStockLabel({ quantity }) {
  return (
    <Container textAlign="center">
      <Label color="green" tag size="large">
        {quantity}
        {' '}
        in stock
      </Label>
    </Container>
  );
}

export default InStockLabel;

InStockLabel.propTypes = {
  quantity: PropTypes.number,
};

InStockLabel.defaultProps = {
  quantity: null,
};
