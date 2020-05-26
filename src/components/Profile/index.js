import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';

import SignInToContinue from '../SignInToContinue';

function Profile({ auth, storeName }) {
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
      <h1>Profile Page</h1>
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
