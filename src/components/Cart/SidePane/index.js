import React from 'react';
import {
  Segment, Header, Icon, Container, Button, Popup, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import CheckoutButton from '../PaypalChkoutButton';

function SidePane({
  total,
  color,
  currency,
  noOfItems,
  updateStock,
  resetStock,
  checkoutInProgress,
  createOrderInDb,
  items,
  cart,
  stockEnabled,
  merchantId,
}) {
  let checkoutDisabled = false;
  let insufficientStockItems = 0;
  let deletedItems = 0;
  if (!(total > 0) || !cart || !Array.isArray(cart)) {
    checkoutDisabled = true;
  }
  cart.forEach((item) => {
    const requestedStock = item.noOfItems;
    const availableStock = items[item.item].subItems[item.subItem].stock;
    const { deleted, visible } = items[item.item];
    if (!availableStock && visible && !deleted) {
      checkoutDisabled = true;
      insufficientStockItems += 1;
    }
    if (stockEnabled && availableStock && availableStock < requestedStock && visible && !deleted) {
      checkoutDisabled = true;
      insufficientStockItems += 1;
    }
    if (!visible || deleted) {
      checkoutDisabled = true;
      deletedItems += 1;
    }
  });

  const disabledPopupContent = (
    <div>
      {insufficientStockItems ? `${insufficientStockItems} item/s do not have sufficient quantity in stock` : null}
      <br />
      {deletedItems ? `${deletedItems} item/s are no longer for sale` : null}
    </div>
  );


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

      <Container style={{ marginTop: '3rem' }}>
        <Divider />
        {
          !checkoutDisabled
          || checkoutInProgress
            ? (
              <CheckoutButton
                total={total}
                currency={currency}
                updateStock={updateStock}
                resetStock={resetStock}
                createOrderInDb={createOrderInDb}
                items={items}
                cart={cart}
                stockEnabled={stockEnabled}
                merchantId={merchantId}
              />
            )
            : (
              <Popup
                header="Checkout disabled"
                content={disabledPopupContent}
                trigger={(
                  <span>
                    <Button
                      fluid
                      disabled
                      content="Checkout"
                    />
                  </span>
                )}
              />

            )
        }
      </Container>
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
  checkoutInProgress: PropTypes.bool.isRequired,
  createOrderInDb: PropTypes.func.isRequired,
  stockEnabled: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  merchantId: PropTypes.string.isRequired,
};

SidePane.defaultProps = {
  color: 'black',
};
