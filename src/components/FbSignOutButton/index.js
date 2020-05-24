import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { signOut } from '../../actions/authActions';

function FbSignOutButton({
  signOut, history, match, fluid,
}) {
  return (
    <Button
      fluid={fluid}
      color="facebook"
      onClick={() => { signOut(history, match.url); }}
      style={{ borderRadius: '0px' }}
    >
      {' '}
      Sign Out
    </Button>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signOut: (history, url) => dispatch(signOut(history, url)),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(FbSignOutButton);

FbSignOutButton.propTypes = {
  signOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
};

FbSignOutButton.defaultProps = {
  fluid: false,
};
