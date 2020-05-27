import React, { useState } from 'react';
import { compose } from 'redux';
import {
  isLoaded, isEmpty, firestoreConnect, withFirestore,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
  Grid, Loader, Sticky, Responsive, Segment, Header, Button, Divider,
} from 'semantic-ui-react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { toastr } from 'react-redux-toastr';

import ItemTable from './ItemTable';
import SidePane from './SidePane';
import SignInToContinue from '../SignInToContinue';
import {
  removeItem, editItemQuantity, updateStock, resetStock, createOrderInDb,
} from '../../actions/cartActions';
import calculateCartTotal from '../../helpers/calculateCartTotal';

function Cart({
  auth,
  items,
  currency,
  cart,
  match,
  removeItem,
  editItemQuantity,
  updateStock,
  resetStock,
  createOrderInDb,
  changeInProgress,
  checkoutInProgress,
  color,
  stockEnabled,
  ratingEnabled,
  contextRef,
  storeName,
}) {
  const [width, setWidth] = useState();

  const handleOnUpdate = (e, { width }) => setWidth(width);

  const onComputerAndTablet = width > Responsive.onlyMobile.maxWidth;

  if (!auth.uid) {
    return <SignInToContinue icon="shopping cart" />;
  }

  if (!(isLoaded(items) && isLoaded(currency) && isLoaded(cart))) {
    return <Loader active size="large" />;
  }

  if (!cart || isEmpty(cart)) {
    return (
      <Segment
        basic
        textAlign="center"
        style={{ marginTop: '5em' }}
      >
        <Helmet>
          <title>
            Cart -
            {' '}
            {storeName}
          </title>
        </Helmet>
        <Header
          as="h2"
          style={{ fontSize: '1.3em', fontWeight: 'normal' }}
        >
          You don&apos;t have any items in your cart
        </Header>
        <Divider hidden />
        <Button
          as="a"
          href={`/${match.params.storeID}`}
          primary
          size="big"
        >
          Start shopping
        </Button>
      </Segment>
    );
  }

  let cartTotal;
  try {
    cartTotal = calculateCartTotal(items, cart);
  } catch (err) {
    toastr.error('Error', 'Something wrong with the items in the cart. Try clearing the cart and readding items');
    cartTotal = 0;
  }

  return (
    <Responsive
      fireOnMount
      onUpdate={handleOnUpdate}
    >
      <Helmet>
        <title>
          Cart -
          {' '}
          {storeName}
        </title>
      </Helmet>
      <Grid stackable>
        <Grid.Row only="computer">
          <Grid.Column computer="11">
            <ItemTable
              items={items}
              currency={currency}
              cart={cart}
              url={`/${match.params.storeID}`}
              removeItem={removeItem}
              editItemQuantity={editItemQuantity}
              contextRef={contextRef}
              changeInProgress={changeInProgress}
              checkoutInProgress={checkoutInProgress}
              color={color}
              stockEnabled={stockEnabled}
              ratingEnabled={ratingEnabled}
              onComputerAndTablet={onComputerAndTablet}
            />
          </Grid.Column>
          <Grid.Column computer="5">
            <Sticky context={contextRef} offset={100} pushing>
              <SidePane
                total={cartTotal}
                currency={currency}
                color={color}
                noOfItems={cart ? cart.length : 0}
                updateStock={updateStock}
                resetStock={resetStock}
                checkoutInProgress={checkoutInProgress}
                createOrderInDb={createOrderInDb}
                stockEnabled={stockEnabled}
                items={items}
                cart={cart}
              />
            </Sticky>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row only="tablet mobile">
          <ItemTable
            items={items}
            currency={currency}
            cart={cart}
            url={`/${match.params.storeID}`}
            removeItem={removeItem}
            editItemQuantity={editItemQuantity}
            contextRef={contextRef}
            changeInProgress={changeInProgress}
            checkoutInProgress={checkoutInProgress}
            color={color}
            stockEnabled={stockEnabled}
            ratingEnabled={ratingEnabled}
            onComputerAndTablet={onComputerAndTablet}
          />
        </Grid.Row>
        <Divider />
        <Grid.Row only="tablet mobile" columns={2}>
          <Grid.Column />
          <Grid.Column>
            <SidePane
              total={cartTotal}
              currency={currency}
              color={color}
              noOfItems={cart ? cart.length : 0}
              updateStock={updateStock}
              resetStock={resetStock}
              createOrderInDb={createOrderInDb}
              checkoutInProgress={checkoutInProgress}
              stockEnabled={stockEnabled}
              items={items}
              cart={cart}
            />
          </Grid.Column>
        </Grid.Row>
        <Divider hidden />
      </Grid>
    </Responsive>
  );
}

const mapStateToProps = (state) => ({
  items: get(state.firestore.data, 'sellerItems'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
  stockEnabled: get(state.firestore.data, 'sellerStore.enableInventoryManagement'),
  ratingEnabled: get(state.firestore.data, 'sellerStore.enableRating'),
  storeName: get(state.firestore.data, 'sellerStore.storeName'),
  cart: get(state.firestore.data, 'buyer.cart'),
  color: get(state.firestore.data, 'sellerStore.storeCustomization.color'),
  changeInProgress: state.cart.changeInProgress,
  checkoutInProgress: state.cart.checkoutInProgress,
});

const mapDispatchToProps = (dispatch, { firestore, match, auth }) => ({
  removeItem: (itemIndex) => (
    dispatch(removeItem(firestore, itemIndex, match.params.storeID, auth.uid))
  ),
  editItemQuantity: (itemIndex, newQuantity) => (
    dispatch(editItemQuantity(firestore, itemIndex, newQuantity, match.params.storeID, auth.uid))
  ),
  updateStock: (items, cart) => (
    dispatch(updateStock(firestore, match.params.storeID, items, cart))
  ),
  resetStock: (items, cart) => (
    dispatch(resetStock(firestore, match.params.storeID, items, cart))
  ),
  createOrderInDb: (items, cart, details) => (
    dispatch(createOrderInDb(firestore, match.params.storeID, auth.uid, items, cart, details))
  ),
});

const connectTo = ({ match, auth }) => {
  if (!(isLoaded(auth))) {
    return [];
  }
  return [{
    collection: `Stores/${match.params.storeID}/Buyers`,
    doc: auth.uid,
    storeAs: 'buyer',
  }];
};

export default compose(
  withFirestore,
  connect((state) => ({ auth: state.firebase.auth })),
  firestoreConnect(connectTo),
  connect(mapStateToProps, mapDispatchToProps),
)(Cart);

Cart.propTypes = {
  auth: PropTypes.object.isRequired,
  items: PropTypes.object,
  currency: PropTypes.string.isRequired,
  cart: PropTypes.array,
  match: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
  editItemQuantity: PropTypes.func.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
  checkoutInProgress: PropTypes.bool.isRequired,
  color: PropTypes.string,
  stockEnabled: PropTypes.bool.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
  updateStock: PropTypes.func.isRequired,
  resetStock: PropTypes.func.isRequired,
  createOrderInDb: PropTypes.func.isRequired,
  contextRef: PropTypes.object.isRequired,
  storeName: PropTypes.string,
};

Cart.defaultProps = {
  cart: undefined,
  color: 'black',
  items: undefined,
  storeName: undefined,
};
