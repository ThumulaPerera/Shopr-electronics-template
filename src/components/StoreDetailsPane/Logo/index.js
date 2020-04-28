import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function Logo({ src }) {
  return (
    <Container>
      <Image centered src={src} style={{ height: '8rem' }} />
    </Container>
  );
}

export default Logo;

Logo.propTypes = {
  src: PropTypes.string,
};

Logo.defaultProps = {
  src: null,
};
