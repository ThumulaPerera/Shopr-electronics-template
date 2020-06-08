import React from 'react';
import { connect } from 'react-redux';
import {
  Segment, Image, Header, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';
import { useRouteMatch } from 'react-router-dom';

import SignInToContinue from '../SignInToContinue';
import { CART_ROUTE, MY_PURCHASES_ROUTE } from '../../constants/routes';

function Profile({ auth, storeName }) {
  const match = useRouteMatch();

  if (!auth.uid) {
    return <SignInToContinue />;
  }

  return (
    <div>
      <Helmet>
        <title>
          Profile -
          {' '}
          {storeName}
        </title>
      </Helmet>
      <Segment basic padded="very" textAlign="center">
        <Image
          src={`${auth.photoURL}?height=500&width=500`}
          circular
          centered
          size="small"
        />
        <Header as="h2">
          {auth.displayName}
        </Header>
        <p style={{ fontSize: '1.2rem' }}>
          {auth.email}
        </p>
        <Divider hidden />
        <Divider hidden />
        <div style={{ fontSize: '1.1rem' }}>
          <a href={`/${match.params.storeID}${CART_ROUTE}`}>
            view my cart
          </a>
          <br />
          <a href={`/${match.params.storeID}${MY_PURCHASES_ROUTE}`}>
            view my purchases
          </a>
        </div>
      </Segment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  storeName: get(state.firestore.data, 'sellerStore.storeName'),
});

export default connect(mapStateToProps)(Profile);

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  storeName: PropTypes.string,
};

Profile.defaultProps = {
  storeName: undefined,
};
