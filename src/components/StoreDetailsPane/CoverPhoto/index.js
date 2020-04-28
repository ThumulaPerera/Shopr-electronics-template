import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function CoverPhoto({ src }) {
  return (
    <Image
      src={src}
      fluid
      style={{ height: '8rem' }}
    />
  );
}

export default CoverPhoto;

CoverPhoto.propTypes = {
  src: PropTypes.string,
};

CoverPhoto.defaultProps = {
  src: null,
};
