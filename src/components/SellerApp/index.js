import React, { createRef } from 'react';
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom';
import { compose } from 'redux';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';
import BrowseProducts from '../BrowseProducts';
import MyPurchases from '../MyPurchases';
import Cart from '../Cart';
import Profile from '../Profile';
import ItemPage from '../ItemPage';
import NotFoundPage from '../NotFoundPage';
import * as ROUTES from '../../constants/routes';

function SellerApp({ sellerStore }) {
  const contextRef = createRef();
  const { path } = useRouteMatch();

  if (!isLoaded(sellerStore)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(sellerStore)) {
    return <NotFoundPage />;
  }

  return (
    <div className="App" ref={contextRef}>
      <NavBar contextRef={contextRef} />
      <ReduxToastr />
      <Switch>
        <Route
          path={`${path}${ROUTES.MY_PURCHASES_ROUTE}`}
          component={MyPurchases}
        />
        <Route
          path={`${path}${ROUTES.CART_ROUTE}`}
          component={Cart}
        />
        <Route
          path={`${path}${ROUTES.PROFILE_ROUTE}`}
          component={Profile}
        />
        <Route
          path={`${path}${ROUTES.ITEMS_ROUTE}/:itemId`}
          component={ItemPage}
        />
        <Route
          path={`${path}${ROUTES.HOME_ROUTE}`}
          render={(props) => <BrowseProducts {...props} contextRef={contextRef} />}
        />
      </Switch>
    </div>
  );
}

const connectTo = ({ match }) => [
  {
    collection: 'Stores',
    doc: `${match.params.storeID}`,
    storeAs: 'sellerStore',
  },
  {
    collection: `/Stores/${match.params.storeID}/Items`,
    storeAs: 'sellerItems',
  },
];

const mapStateToProps = (state) => ({
  sellerStore: get(state.firestore.ordered, 'sellerStore'),
});

export default compose(
  firestoreConnect(connectTo),
  connect(mapStateToProps),
)(SellerApp);

SellerApp.propTypes = {
  sellerStore: PropTypes.object.isRequired,
};
