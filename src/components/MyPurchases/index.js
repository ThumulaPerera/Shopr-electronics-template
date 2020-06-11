import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Segment, Divider, Header, Button, Loader, Dropdown, Sticky, Grid, Responsive,
} from 'semantic-ui-react';
import {
  isLoaded, isEmpty, firestoreConnect,
} from 'react-redux-firebase';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import * as moment from 'moment';

import SignInToContinue from '../SignInToContinue';
import Order from './Order';
import { addReview } from '../../actions/reviewActions';


export function MyPurchases({
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
  storeName,
  firestore,
  contextRef,
}) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('Date: closest to earliest');
  const [width, setWidth] = useState();

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
        <Helmet>
          <title>
            Purchases -
            {' '}
            {storeName}
          </title>
        </Helmet>
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

  const handleOnResponsiveUpdate = (e, { width }) => setWidth(width);

  const stickSearchBar = width > Responsive.onlyMobile.maxWidth;

  const dateAsc = 'Date: Earliest to Closest';
  const dateDsc = 'Date: Closest to Earliest';
  const totAsc = 'Order Total: Low to High';
  const totDsc = 'Order Total: High to Low';

  const sortOptions = [
    { key: dateAsc, text: dateAsc, value: dateAsc },
    { key: dateDsc, text: dateDsc, value: dateDsc },
    { key: totAsc, text: totAsc, value: totAsc },
    { key: totDsc, text: totDsc, value: totDsc },
  ];

  const filterOptions = [];
  orderStates.forEach((orderState) => {
    filterOptions.push({
      key: orderState,
      text: orderState,
      value: orderState,
    });
  });

  const handleSortChange = (e, { value }) => setSortBy(value);

  const handleFilterChange = (e, { value }) => setFilter(value);

  const filteredOrders = orders.filter((order) => {
    if (!filter) {
      return true;
    }
    return orderStates[order.orderState[order.orderState.length - 1].stateId] === filter;
  });

  switch (sortBy) {
    case dateDsc: {
      filteredOrders.sort((a, b) => {
        const dateA = moment(a.date.toDate());
        const dateB = moment(b.date.toDate());
        return dateA.isBefore(dateB) ? 1 : -1;
      });
      break;
    }
    case dateAsc: {
      filteredOrders.sort((a, b) => {
        const dateA = moment(a.date.toDate());
        const dateB = moment(b.date.toDate());
        return dateA.isBefore(dateB) ? -1 : 1;
      });
      break;
    }
    case totAsc: {
      filteredOrders.sort((a, b) => {
        const totA = a.totalPrice;
        const totB = b.totalPrice;
        return totA - totB;
      });
      break;
    }
    case totDsc: {
      filteredOrders.sort((a, b) => {
        const totA = a.totalPrice;
        const totB = b.totalPrice;
        return totB - totA;
      });
      break;
    }
    default:
  }

  return (
    <Responsive
      fireOnMount
      onUpdate={handleOnResponsiveUpdate}
    >
      <Helmet>
        <title>
          Purchases -
          {' '}
          {storeName}
        </title>
      </Helmet>
      <Sticky
        context={contextRef}
        offset={72}
        active={stickSearchBar}
      >
        <Segment
          textAlign="center"
          color={color}
          inverted
          tertiary
          style={{ padding: '.5em', borderRadius: '0px' }}
        >
          <Grid relaxed="very" padded="horizontally" stackable>
            <Grid.Row columns={3}>
              <Grid.Column only="computer" computer="6" />
              <Grid.Column computer="5" tablet="8">
                <Dropdown
                  onChange={handleFilterChange}
                  options={filterOptions}
                  placeholder="Filter by state"
                  fluid
                  selection
                  clearable
                  icon="filter"
                  labeled
                  button
                  className="icon"
                />
              </Grid.Column>
              <Grid.Column computer="5" tablet="8">
                <Dropdown
                  onChange={handleSortChange}
                  options={sortOptions}
                  placeholder="Sort by"
                  selection
                  fluid
                  icon="sort"
                  labeled
                  button
                  className="icon"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Sticky>
      <Segment basic>


        {
      filteredOrders && filteredOrders.map((order) => (
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
            firestore={firestore}
            storeId={storeID}
          />
          <Divider hidden />
        </div>
      ))
    }
      </Segment>
    </Responsive>
  );
}

const mapStateToProps = (state) => ({
  items: get(state.firestore.data, 'sellerItems'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
  color: get(state.firestore.data, 'sellerStore.storeCustomization.color'),
  ratingEnabled: get(state.firestore.data, 'sellerStore.enableRating'),
  storeName: get(state.firestore.data, 'sellerStore.storeName'),
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
  firestore: PropTypes.object.isRequired,
  storeName: PropTypes.string,
  contextRef: PropTypes.object.isRequired,
};

MyPurchases.defaultProps = {
  color: 'black',
  items: undefined,
  orders: undefined,
  orderStates: undefined,
  storeName: undefined,
};
