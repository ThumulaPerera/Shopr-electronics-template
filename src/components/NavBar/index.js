/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Sticky, Loader, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import MobileSignedOutMenu from './MobileSignedOutMenu';
import MobileSignedInMenu from './MobileSignedInMenu';

class NavBar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleResponsiveUpdate = (e, { width }) => this.setState({ width })

  render() {
    const { contextRef, auth, storeCustomization } = this.props;
    const { activeItem, width } = this.state;

    if (!isLoaded(storeCustomization)) {
      return <Loader active />;
    }

    const color = storeCustomization.color ? storeCustomization.color : null;
    const onMobile = width <= Responsive.onlyMobile.maxWidth;

    return (
      <Responsive
        fireOnMount
        onUpdate={this.handleResponsiveUpdate}
      >
        <Sticky context={contextRef}>
          {
            auth.uid
            && !onMobile
            && (
            <SignedInMenu
              activeItem={activeItem}
              handleItemClick={this.handleItemClick}
              color={color}
              logo={storeCustomization.logo ? storeCustomization.logo : ''}
              displayName={auth.displayName}
              displayPhoto={auth.photoURL}
            />
            )
          }
          {
            auth.uid
            && onMobile
            && (
            <MobileSignedInMenu
              activeItem={activeItem}
              handleItemClick={this.handleItemClick}
              color={color}
              logo={storeCustomization.logo ? storeCustomization.logo : ''}
              displayName={auth.displayName}
              displayPhoto={auth.photoURL}
            />
            )
          }
          {
            !auth.uid
            && !onMobile
            && (
            <SignedOutMenu
              activeItem={activeItem}
              handleItemClick={this.handleItemClick}
              color={color}
              logo={storeCustomization.logo ? storeCustomization.logo : ''}
            />
            )
          }
          {
            !auth.uid
            && onMobile
            && (
            <MobileSignedOutMenu
              activeItem={activeItem}
              handleItemClick={this.handleItemClick}
              color={color}
              logo={storeCustomization.logo ? storeCustomization.logo : ''}
            />
            )
          }
        </Sticky>
      </Responsive>
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
