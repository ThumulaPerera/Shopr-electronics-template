import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Segment, Divider } from 'semantic-ui-react';
import {
  isLoaded, firestoreConnect,
} from 'react-redux-firebase';
import { compose } from 'redux';

import SignInToContinue from '../SignInToContinue';
import Order from './Order';

function MyPurchases({
  auth, items, currency, color, ratingEnabled, orders, orderStates,
}) {
  if (!auth.uid) {
    return <SignInToContinue />;
  }

  if (!isLoaded(orders)) {
    return <div>loading...</div>;
  }

  return (
    <Segment basic>
      {
      orders && orders.map((order) => (
        <div>
          <Order
            order={order}
            items={items}
            currency={currency}
            color={color}
            ratingEnabled={ratingEnabled}
            orderStates={orderStates}
          />
          <Divider hidden />
        </div>
      ))
    }
    </Segment>
  );
}

const mapStateToProps = (state) => ({
  items: get(state.firestore.data, 'sellerItems'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
  color: get(state.firestore.data, 'sellerStore.storeCustomization.color'),
  ratingEnabled: get(state.firestore.data, 'sellerStore.enableRating'),
  orders: get(state.firestore.ordered, 'orders'),
  orderStates: get(state.firestore.data, 'config.orderStates'),
});

const connectTo = ({ match, auth }) => {
  if (!(isLoaded(auth))) {
    return [];
  }
  return [{
    collection: `Stores/${match.params.storeID}/Orders`,
    storeAs: 'orders',
    where: [['buyer', '==', `${auth.uid}`]],
    queryParams: ['orderByChild=date'],
  }];
};

export default compose(
  connect((state) => ({ auth: state.firebase.auth })),
  firestoreConnect(connectTo),
  connect(mapStateToProps),
)(MyPurchases);

MyPurchases.propTypes = {
  auth: PropTypes.object.isRequired,
  items: PropTypes.object,
  currency: PropTypes.string.isRequired,
  color: PropTypes.string,
  ratingEnabled: PropTypes.bool.isRequired,
  orders: PropTypes.array,
  orderStates: PropTypes.array,
};

MyPurchases.defaultProps = {
  color: 'black',
  items: undefined,
  orders: undefined,
  orderStates: undefined,
};
