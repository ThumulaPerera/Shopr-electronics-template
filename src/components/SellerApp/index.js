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
import { Loader } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import NavBar from '../NavBar';
import Footer from '../Footer';
import BrowseProducts from '../BrowseProducts';
import MyPurchases from '../MyPurchases';
import Cart from '../Cart';
import Profile from '../Profile';
import ItemPage from '../ItemPage';
import ChatBot from '../ChatBot';
import NotFoundPage from '../NotFoundPage';
import * as ROUTES from '../../constants/routes';

function SellerApp({ sellerStore, templates }) {
  const contextRef = createRef();
  const { path, params } = useRouteMatch();

  if (!(isLoaded(sellerStore) && isLoaded(templates))) {
    return <Loader active size="large" />;
  }

  if (isEmpty(sellerStore)
    || !sellerStore[0].verified
    || templates[sellerStore[0].template.id].title !== 'Electronics'
  ) {
    return <NotFoundPage />;
  }

  return (
    <div className="App" ref={contextRef}>
      <Helmet>
        <title>{sellerStore[0].storeName}</title>
      </Helmet>
      <div style={{ minHeight: '100vh' }}>
        <NavBar contextRef={contextRef} />
        <ReduxToastr
          position="bottom-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          timeOut={4000}
          newestOnTop={false}
        />
        {
        sellerStore[0].enableChatbot
        && <ChatBot storeId={params.storeID} />
      }
        <Switch>
          <Route
            path={`${path}${ROUTES.MY_PURCHASES_ROUTE}`}
            render={(props) => <MyPurchases {...props} contextRef={contextRef} />}
          />
          <Route
            path={`${path}${ROUTES.CART_ROUTE}`}
            render={(props) => <Cart {...props} contextRef={contextRef} />}
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
      <Footer sellerStore={sellerStore[0]} />
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
  {
    collection: 'Config',
    doc: 'config_main',
    storeAs: 'config',
  },
  {
    collection: 'Templates',
    storeAs: 'templates',
  },
];

const mapStateToProps = (state) => ({
  sellerStore: get(state.firestore.ordered, 'sellerStore'),
  templates: get(state.firestore.data, 'templates'),
});

export default compose(
  firestoreConnect(connectTo),
  connect(mapStateToProps),
)(SellerApp);

SellerApp.propTypes = {
  sellerStore: PropTypes.array,
  templates: PropTypes.object,
};

SellerApp.defaultProps = {
  sellerStore: undefined,
  templates: undefined,
};
