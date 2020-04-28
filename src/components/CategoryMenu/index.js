import React, { Component } from 'react';
import { Menu, Segment, Sticky } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { get } from 'lodash';
import { compose } from 'redux';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

class CategoryMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state;
      const {
        categories, contextRef, url, storeCustomization,
      } = this.props;

      if (!isLoaded(storeCustomization)) {
        return <div>Loading...</div>;
      }

      if (!isLoaded(categories)) {
        return <div>Loading...</div>;
      }

      if (isEmpty(categories)) {
        return <div>No categories to display...</div>;
      }

      const color = storeCustomization.color ? storeCustomization.color : '';

      return (
        <Sticky
          context={contextRef}
          offset={80}
        >
          <Segment padded basic>
            <Segment textAlign="center" size="large" basic>
              Categories
            </Segment>
            <div style={{ overflow: 'auto', maxHeight: 500 }}>
              <Menu pointing secondary vertical color={color}>
                <Link to={`${url}/`}>
                  <Menu.Item
                    as="p"
                    name="All"
                    active={activeItem === 'All'}
                    onClick={this.handleItemClick}
                  />
                </Link>
                {Object.keys(categories).map((key) => {
                  const { name } = categories[key];
                  return (
                    <Link to={`${url}/${name}`} key={key}>
                      <Menu.Item
                        as="p"
                        name={name}
                        active={activeItem === name}
                        onClick={this.handleItemClick}
                      />
                    </Link>
                  );
                })}
              </Menu>
            </div>

          </Segment>
        </Sticky>

      );
    }
}

const mapStateToProps = (state) => ({
  categories: get(state.firestore.data, 'sellerStore.categories'),
  storeCustomization: get(state.firestore.data, 'sellerStore.storeCustomization'),
});

function withHooks(Component) {
  return function WrappedComponent(props) {
    const { url } = useRouteMatch();
    return <Component {...props} url={applyUrlCorrection(url)} />;
  };
}

export default compose(
  withHooks,
  connect(mapStateToProps),
)(CategoryMenu);

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  contextRef: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  storeCustomization: PropTypes.object.isRequired,
};
