import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Segment, Divider, Header, Button, Loader,
} from 'semantic-ui-react';
import {
  isLoaded, isEmpty, firestoreConnect,
} from 'react-redux-firebase';
import { compose } from 'redux';

import SignInToContinue from '../SignInToContinue';
import Order from './Order';
import { addReview } from '../../actions/reviewActions';

function MyPurchases({
  auth,
  items,
  currency,
  color,
  ratingEnabled,
  orders,
  orderStates,
  addReview,
  changeInProgress,
  match,
}) {
  if (!auth.uid) {
    return <SignInToContinue />;
  }

  if (!isLoaded(orders)) {
    return <Loader active size="large" />;
  }

  const { storeID } = match.params;
  const url = `/${storeID}`;

  if (!orders || isEmpty(orders)) {
    return (
      <Segment
        basic
        textAlign="center"
        style={{ marginTop: '5em' }}
      >
        <Header
          as="h2"
          style={{ fontSize: '1.3em', fontWeight: 'normal' }}
        >
          You don&apos;t have any purchases
        </Header>
        <Divider hidden />
        <Button
          as="a"
          href={url}
          primary
          size="big"
        >
          Start shopping
        </Button>
      </Segment>
    );
  }

  return (
    <Segment basic>
      {
      orders && orders.map((order) => (
        <div key={order.id}>
          <Order
            order={order}
            items={items}
            currency={currency}
            color={color}
            ratingEnabled={ratingEnabled}
            orderStates={orderStates}
            addReview={addReview}
            changeInProgress={changeInProgress}
            buyerId={auth.uid}
            url={url}
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
  changeInProgress: state.review.changeInProgress,
});

const mapDispatchToProps = (dispatch, { firestore, match, auth }) => ({
  addReview: (item, ratingValue, reviewValue) => (
    dispatch(
      addReview(
        firestore,
        item,
        ratingValue,
        reviewValue,
        match.params.storeID,
        auth.uid,
        auth.displayName,
        auth.photoURL,
      ),
    )
  ),
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
  connect(mapStateToProps, mapDispatchToProps),
)(MyPurchases);

MyPurchases.propTypes = {
  auth: PropTypes.object.isRequired,
  items: PropTypes.object,
  currency: PropTypes.string.isRequired,
  color: PropTypes.string,
  ratingEnabled: PropTypes.bool.isRequired,
  orders: PropTypes.array,
  orderStates: PropTypes.array,
  addReview: PropTypes.func.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

MyPurchases.defaultProps = {
  color: 'black',
  items: undefined,
  orders: undefined,
  orderStates: undefined,
};
