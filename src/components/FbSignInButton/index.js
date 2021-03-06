import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { signInWithFb } from '../../actions/authActions';

function FbSignInButton({ signIn, fluid }) {
  return (
    <Button
      fluid={fluid}
      color="facebook"
      icon
      labelPosition="right"
      onClick={signIn}
      style={{ borderRadius: '0px' }}
    >
      Sign In With Facebook
      <Icon name="facebook" size="large" />
    </Button>
  );
}

const mapDispatchToProps = (dispatch, { storeID, firestore }) => ({
  signIn: () => dispatch(signInWithFb(storeID, firestore)),
});

function withHooks(Component) {
  return function WrappedComponent(props) {
    const match = useRouteMatch();
    return <Component {...props} storeID={match.params.storeID} />;
  };
}

export default compose(
  withHooks,
  withFirestore,
  connect(null, mapDispatchToProps),
)(FbSignInButton);

FbSignInButton.propTypes = {
  signIn: PropTypes.func.isRequired,
  fluid: PropTypes.bool,
};

FbSignInButton.defaultProps = {
  fluid: false,
};
