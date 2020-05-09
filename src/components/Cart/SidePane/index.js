import React from 'react';
import {
  Segment, Header, Icon, Container,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

// import CheckoutButton from '../PaypalCheckoutButton';
// import CheckoutButton from '../CheckoutButton';
import CheckoutButton from '../PaypalChkoutButton';

function SidePane({
  total,
  color,
  currency,
  noOfItems,
  updateStock,
  resetStock,
  createOrderInDb,
  items,
  cart,
  stockEnabled,
}) {
  return (
    <Segment size="massive" style={{ marginRight: '2rem' }} color={color}>
      <Header as="h2" textAlign="center">
        Cart Summary
      </Header>
      <Header as="h3">
        {noOfItems}
        {' '}
        {noOfItems === 1 ? 'item in cart' : 'items in cart'}
      </Header>
      <Header as="h6">
        <Icon name="cart" color={color} />
        Cart Total :
      </Header>
      <Container textAlign="center">
        <Header as="h2">
          {currency}
          {' '}
          {total.toFixed(2)}
        </Header>
      </Container>
      {/* <Segment basic padded='very' textAlign='center' > */}
      <Container style={{ marginTop: '3rem' }}>
        <CheckoutButton
          total={total}
          currency={currency}
          updateStock={updateStock}
          resetStock={resetStock}
          createOrderInDb={createOrderInDb}
          items={items}
          cart={cart}
          stockEnabled={stockEnabled}
        />
      </Container>
      {/* </Segment> */}
    </Segment>
  );
}

export default SidePane;
SidePane.propTypes = {
  total: PropTypes.number.isRequired,
  color: PropTypes.string,
  currency: PropTypes.string.isRequired,
  noOfItems: PropTypes.number.isRequired,
  updateStock: PropTypes.func.isRequired,
  resetStock: PropTypes.func.isRequired,
  createOrderInDb: PropTypes.func.isRequired,
  stockEnabled: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
};

SidePane.defaultProps = {
  color: 'black',
};
