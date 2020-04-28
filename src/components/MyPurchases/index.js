import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignInToContinue from '../SignInToContinue';

function MyPurchases({ auth }) {
  if (!auth.uid) {
    return <SignInToContinue />;
  }

  return (
    <div>
      <h1>Purchases Page</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(MyPurchases);

MyPurchases.propTypes = {
  auth: PropTypes.object.isRequired,
};
