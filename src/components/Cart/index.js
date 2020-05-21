import React, { createRef, useState } from 'react';
import { compose } from 'redux';
import {
  isLoaded, firestoreConnect, withFirestore,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
  Grid, Loader, Ref, Sticky, Responsive,
} from 'semantic-ui-react';
import { get } from 'lodash';
import PropTypes from 'prop-types';


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
}) {
  const [width, setWidth] = useState();

  const handleOnUpdate = (e, { width }) => setWidth(width);

  const onComputerAndTablet = width > Responsive.onlyMobile.maxWidth;

  const contextRef = createRef();

  if (!auth.uid) {
    return <SignInToContinue icon="shopping cart" />;
  }

  if (!(isLoaded(items) && isLoaded(currency) && isLoaded(cart))) {
    return <Loader />;
  }

  return (
    <Responsive
      fireOnMount
      onUpdate={handleOnUpdate}
    >
      <Ref innerRef={contextRef}>
        <Grid stackable>
          <Grid.Row only="computer">
            <Grid.Column computer="11" tablet="16">
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
                onComputerAndTablet={onComputerAndTablet}
              />
            </Grid.Column>
            <Grid.Column computer="5" tablet="16">
              <Sticky context={contextRef} offset={200}>
                <SidePane
                  total={calculateCartTotal(items, cart)}
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
              onComputerAndTablet={onComputerAndTablet}
            />
          </Grid.Row>
          <Grid.Row only="tablet mobile" columns={2}>
            <Grid.Column />
            <Grid.Column>
              <SidePane
                total={calculateCartTotal(items, cart)}
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
        </Grid>
      </Ref>
    </Responsive>
  );
}

const mapStateToProps = (state) => ({
  items: get(state.firestore.data, 'sellerItems'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
  stockEnabled: get(state.firestore.data, 'sellerStore.enableInventoryManagement'),
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
  updateStock: PropTypes.func.isRequired,
  resetStock: PropTypes.func.isRequired,
  createOrderInDb: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: undefined,
  color: 'black',
  items: undefined,
};
