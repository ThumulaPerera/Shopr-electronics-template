import React, { Component } from 'react';
import {
  Table, Segment, Sticky, Button, Popup, Icon, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import ItemCard from '../../ItemCard';
import ShowVariantsAccordian from '../../ShowVariantsAccordian';
import QuantityForm from './QuantityForm';
import calculateDiscount from '../../../helpers/calculateDiscount';
import calculateRating from '../../../helpers/calculateRating';

class ItemTable extends Component {
    deleteFromCart = (index) => {
      const { removeItem } = this.props;
      const toastrConfirmOptions = {
        onOk: () => removeItem(index),
        onCancel: () => (null),
      };
      toastr.confirm('Remove item from cart?', toastrConfirmOptions);
    }

    render() {
      const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg';
      const {
        items,
        currency,
        cart,
        url,
        contextRef,
        removeItem,
        editItemQuantity,
        changeInProgress,
        checkoutInProgress,
        color,
        stockEnabled,
        ratingEnabled,
        onComputerAndTablet,
      } = this.props;
      return (
        <Segment basic>
          <Sticky context={contextRef} offset={72} active={onComputerAndTablet}>
            <Table
              fixed
              textAlign="center"
              color={color}
              style={{ borderRadius: '0px' }}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Item</Table.HeaderCell>
                  <Table.HeaderCell>Variants and Attributes</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Sticky>
          {/* <div style={{ maxHeight: '70vh', overflowY: 'scroll', marginTop: '.5rem' }}> */}
          <Table basic="very" fixed textAlign="center">
            <Table.Body>
              {cart && cart.map((orderItem, index) => {
                const item = items[orderItem.item];
                const variantArray = item.subItems[orderItem.subItem].variants;
                const { price } = item.subItems[orderItem.subItem];
                const { stock } = item.subItems[orderItem.subItem];
                const quantity = orderItem.noOfItems;

                const {
                  name, photos, discount, rating, deleted, visible,
                } = item;

                const discountValue = calculateDiscount(price, discount);
                const itemRating = rating ? calculateRating(rating) : null;
                // eslint-disable-next-line no-nested-ternary
                const imageURL = photos && photos[0]
                  ? (photos[0].thumbnail ? photos[0].thumbnail : photos[0].url)
                  : defaultImgUrl;

                return (
                // eslint-disable-next-line react/no-array-index-key
                  <Table.Row key={index}>
                    <Table.Cell style={{ padding: '1rem' }} verticalAlign="top">
                      <ItemCard
                        id={orderItem.item}
                        name={name}
                        currency={currency}
                        price={price}
                        url={url}
                        imageURL={imageURL}
                        discount={discount}
                        rating={itemRating}
                        ratingEnabled={ratingEnabled}
                        tiny
                      />
                    </Table.Cell>
                    <Table.Cell verticalAlign="top" textAlign="left">
                      <ShowVariantsAccordian variantArray={variantArray} item={item} />
                    </Table.Cell>
                    <Table.Cell textAlign="center" verticalAlign="top">
                      <p>
                        <h4>
                          x
                          {' '}
                          {quantity}
                          {' '}

                          {stockEnabled
                      && stock !== undefined
                      && stock != null
                      && stock !== 0
                      && !checkoutInProgress
                      && stock < quantity
                      && visible
                      && !deleted
                      && (
                        <Popup
                          trigger={<Icon size="large" color="red" name="warning" />}
                          header="Selected quantity no longer in stock"
                          content={`Only ${stock} item/s in stock. Change the quantity or remove this item before checking out`}
                          size="small"
                          position="top center"
                        />
                      )}
                          {stockEnabled
                      && !stock
                      && !checkoutInProgress
                      && visible
                      && !deleted
                      && (
                        <Popup
                          trigger={<Icon size="large" color="red" name="warning" />}
                          header="Item no longer in stock"
                          content="Remove this item from cart before checking out"
                          size="small"
                          position="top center"
                        />
                      )}
                          {!stockEnabled
                      && !stock
                      && !checkoutInProgress
                      && visible
                      && !deleted
                      && (
                        <Popup
                          trigger={<Icon size="large" color="red" name="warning" />}
                          header="Item no longer in stock"
                          content="Remove this item from cart before checking out"
                          size="small"
                          position="top center"
                        />
                      )}
                          {(!visible
                      || deleted)
                      && (
                        <Popup
                          trigger={<Icon size="large" color="red" name="warning" />}
                          header="This item is no longer for sale"
                          content="Remove this item from cart before checking out"
                          size="small"
                          position="top center"
                        />
                      )}
                        </h4>
                      </p>
                      <QuantityForm
                        index={index}
                        editItemQuantity={editItemQuantity}
                        removeItem={removeItem}
                        currentQuantity={quantity}
                        stockEnabled={stockEnabled}
                        stock={stock}
                        changeInProgress={changeInProgress}
                      />
                      <br />
                      <Button
                        onClick={() => this.deleteFromCart(index)}
                        disabled={changeInProgress}
                        basic
                        negative
                        fluid
                      >
                        Remove from cart
                      </Button>


                    </Table.Cell>
                    <Table.Cell verticalAlign="top">
                      <Divider hidden />
                      <h4>
                        {currency}
                        {' '}
                        {(quantity * (price - discountValue).toFixed(2)).toFixed(2)}
                      </h4>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {/* </div> */}
        </Segment>
      );
    }
}

export default ItemTable;

ItemTable.propTypes = {
  items: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  cart: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  contextRef: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
  editItemQuantity: PropTypes.func.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
  checkoutInProgress: PropTypes.bool.isRequired,
  color: PropTypes.string,
  stockEnabled: PropTypes.bool.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
  onComputerAndTablet: PropTypes.bool.isRequired,
};

ItemTable.defaultProps = {
  color: 'black',
};
