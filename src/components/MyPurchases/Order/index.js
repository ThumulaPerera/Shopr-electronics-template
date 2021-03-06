import React from 'react';
import {
  Segment, Item, Grid, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ItemsAccordian from '../ItemsAccordian';
import ReceivedBtn from '../ReceivedBtn';

function Order({
  order,
  items,
  currency,
  color,
  ratingEnabled,
  orderStates,
  addReview,
  changeInProgress,
  buyerId,
  url,
  firestore,
  storeId,
}) {
  const date = order.date.toDate().toString();
  const orderStateId = order.orderState[order.orderState.length - 1].stateId;
  const orderState = orderStates[orderStateId];
  const {
    paymentMethod, totalPrice, orderItems, id,
  } = order;
  const total = currency.concat(' ', totalPrice.toFixed(2).toString());
  let shippingAddress = order.shippingAddress.name && order.shippingAddress.name.full_name
    ? order.shippingAddress.name.full_name : '';
  const addressFields = ['address_line_1', 'admin_area_1', 'admin_area_2', 'country_code', 'postal_code'];
  if (order.shippingAddress.address) {
    addressFields.map((field) => {
      shippingAddress = shippingAddress.concat(', ', order.shippingAddress.address[field]);
      return null;
    });
  }

  return (
    <Segment color={color}>
      <Item.Group>
        <Item>
          <Item.Content>
            <h4>
              Order ID :
              {' '}
              {id}
            </h4>
            <Divider />
            <Item.Meta>
              <h4>Order Items</h4>
            </Item.Meta>
            <ItemsAccordian
              orderItems={orderItems}
              orderStateId={orderStateId}
              items={items}
              currency={currency}
              ratingEnabled={ratingEnabled}
              addReview={addReview}
              changeInProgress={changeInProgress}
              buyerId={buyerId}
              url={url}
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
            {orderStateId === 1
            && (
            <Item.Extra>
              <ReceivedBtn
                firestore={firestore}
                storeId={storeId}
                orderId={id}
              />
            </Item.Extra>
            )}
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
  url: PropTypes.string.isRequired,
  firestore: PropTypes.object.isRequired,
  storeId: PropTypes.string.isRequired,
};

Order.defaultProps = {
  color: 'black',
  items: undefined,
  order: undefined,
  orderStates: undefined,
};
