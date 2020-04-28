import React from 'react';
import {
  Header, Icon, Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import FbSignInButton from '../FbSignInButton';

function SignInToContinue({ icon }) {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name={icon} />
        Sign in to view this page
      </Header>
      <FbSignInButton />
    </Segment>
  );
}

export default SignInToContinue;

SignInToContinue.propTypes = {
  icon: PropTypes.string,
};

SignInToContinue.defaultProps = {
  icon: null,
};
