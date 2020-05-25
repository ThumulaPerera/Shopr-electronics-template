import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Visibility, Image, Loader } from 'semantic-ui-react';

export default class LazyImage extends Component {
    state = {
      show: false,
    }

    showImage = () => {
      this.setState({
        show: true,
      });
    }

    render() {
      const { size } = this.props;
      const { show } = this.state;
      if (!show) {
        return (
          <Visibility as="span" onTopVisible={this.showImage}>
            <Loader active inline="centered" size={size} />
          </Visibility>
        );
      }
      return <Image {...this.props} />;
    }
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
};

LazyImage.defaultProps = {
  size: 'medium',
};
