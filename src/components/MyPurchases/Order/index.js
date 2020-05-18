import React from 'react';
import {
  Segment, Item, Grid, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ItemsAccordian from '../ItemsAccordian';

function Order({
  order, items, currency, color, ratingEnabled, orderStates, addReview, changeInProgress, buyerId,
}) {
  const date = order.date.toDate().toString();
  const orderState = orderStates[order.orderStates[order.orderStates.length - 1].stateId];
  const { paymentMethod, totalPrice, orderItems } = order;
  const total = currency.concat(' ', totalPrice.toFixed(2).toString());
  let shippingAddress = order.shippingAddress.name.full_name;
  const addressFields = ['address_line_1', 'admin_area_1', 'admin_area_2', 'country_code', 'postal_code'];
  addressFields.map((field) => {
    shippingAddress = shippingAddress.concat(', ', order.shippingAddress.address[field]);
    return null;
  });

  return (
    <Segment color={color}>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Meta>
              <h4><b>Order Items</b></h4>
            </Item.Meta>
            <ItemsAccordian
              orderItems={orderItems}
              orderState={orderState}
              items={items}
              currency={currency}
              ratingEnabled={ratingEnabled}
              addReview={addReview}
              changeInProgress={changeInProgress}
              buyerId={buyerId}
            />
            <Divider />
            <Grid columns="2">
              <Grid.Column>
                <Item.Meta>
                  Order Date :
                </Item.Meta>
                <Item.Description>
                  {date}
                </Item.Description>
                <Item.Meta>
                  Order State :
                </Item.Meta>
                <Item.Description>
                  {orderState}
                </Item.Description>
                <Item.Meta>
                  Shipping Address :
                </Item.Meta>
                <Item.Description>
                  {shippingAddress}
                </Item.Description>
              </Grid.Column>
              <Grid.Column>
                <Item.Meta>
                  Total Price:
                </Item.Meta>
                <Item.Description>
                  <h1>
                    {total}
                  </h1>
                </Item.Description>
                <Item.Meta>
                  Payment Method :
                </Item.Meta>
                <Item.Description>
                  {paymentMethod}
                </Item.Description>
              </Grid.Column>
            </Grid>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}

export default Order;

Order.propTypes = {
  items: PropTypes.object,
  currency: PropTypes.string.isRequired,
  color: PropTypes.string,
  ratingEnabled: PropTypes.bool.isRequired,
  order: PropTypes.object,
  orderStates: PropTypes.array,
  addReview: PropTypes.func.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
  buyerId: PropTypes.string.isRequired,
};

Order.defaultProps = {
  color: 'black',
  items: undefined,
  order: undefined,
  orderStates: undefined,
};
