import React, { createRef } from 'react';
import { compose } from 'redux';
import {
  isLoaded, firestoreConnect, withFirestore,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
  Grid, Loader, Ref, Sticky,
} from 'semantic-ui-react';
import { get } from 'lodash';
import PropTypes from 'prop-types';


import ItemTable from './ItemTable';
import SidePane from './SidePane';
import SignInToContinue from '../SignInToContinue';
import { removeItem, editItemQuantity } from '../../actions/cartActions';

import calculateCartTotal from '../../helpers/calculateCartTotal';

function Cart({
  auth,
  items,
  currency,
  cart,
  match,
  removeItem,
  editItemQuantity,
  changeInProgress,
  color,
  stockEnabled,
}) {
  const contextRef = createRef();

  if (!auth.uid) {
    return <SignInToContinue icon="shopping cart" />;
  }

  if (!(isLoaded(items) && isLoaded(currency) && isLoaded(cart))) {
    return <Loader />;
  }

  return (
    <Ref innerRef={contextRef}>
      <Grid>
        <Grid.Row>
          <Grid.Column width="12">
            <ItemTable
              items={items}
              currency={currency}
              cart={cart}
              url={`/${match.params.storeID}`}
              removeItem={removeItem}
              editItemQuantity={editItemQuantity}
              contextRef={contextRef}
              changeInProgress={changeInProgress}
              color={color}
              stockEnabled={stockEnabled}
            />
          </Grid.Column>
          <Grid.Column width="4">
            <Sticky context={contextRef} offset={200}>
              <SidePane
                total={calculateCartTotal(items, cart)}
                currency={currency}
                color={color}
                noOfItems={cart ? cart.length : 0}
              />
            </Sticky>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Ref>
  );
}

const mapStateToProps = (state) => ({
  items: get(state.firestore.data, 'sellerItems'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
  stockEnabled: get(state.firestore.data, 'sellerStore.enableInventoryManagement'),
  cart: get(state.firestore.data, 'buyer.cart'),
  color: get(state.firestore.data, 'sellerStore.storeCustomization.color'),
  changeInProgress: state.cart.changeInProgress,
});

const mapDispatchToProps = (dispatch, { firestore, match, auth }) => ({
  removeItem: (itemIndex) => (
    dispatch(removeItem(firestore, itemIndex, match.params.storeID, auth.uid))
  ),
  editItemQuantity: (itemIndex, newQuantity) => (
    dispatch(editItemQuantity(firestore, itemIndex, newQuantity, match.params.storeID, auth.uid))
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
  items: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  cart: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
  editItemQuantity: PropTypes.func.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  stockEnabled: PropTypes.bool.isRequired,
};
