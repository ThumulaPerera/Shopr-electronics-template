import React, { Component } from 'react';
import { Sticky, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

class NavBar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { contextRef, auth, storeCustomization } = this.props;
    const { activeItem } = this.state;

    if (!isLoaded(storeCustomization)) {
      return <Loader />;
    }

    const color = storeCustomization.color ? storeCustomization.color : null;

    return (
      <Sticky context={contextRef}>
        {auth.uid
          ? (
            <SignedInMenu
              activeItem={activeItem}
              handleItemClick={this.handleItemClick}
              color={color}
              logo={storeCustomization.logo ? storeCustomization.logo : ''}
            />
          )
          : (
            <SignedOutMenu
              activeItem={activeItem}
              handleItemClick={this.handleItemClick}
              color={color}
              logo={storeCustomization.logo ? storeCustomization.logo : ''}
            />
          )}
      </Sticky>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  storeCustomization: get(state.firestore.data, 'sellerStore.storeCustomization'),
});

export default connect(mapStateToProps)(NavBar);

NavBar.propTypes = {
  contextRef: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  storeCustomization: PropTypes.object.isRequired,
};
