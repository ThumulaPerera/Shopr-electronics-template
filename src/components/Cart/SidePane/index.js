import React from 'react';
import {
  Segment, Header, Icon, Container, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function SidePane({
  total, color, currency, noOfItems,
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
        <Button fluid positive size="large">CHECKOUT</Button>
      </Container>
      {/* </Segment> */}
    </Segment>
  );
}

export default SidePane;
SidePane.propTypes = {
  total: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  currency: PropTypes.object.isRequired,
  noOfItems: PropTypes.number.isRequired,
};
