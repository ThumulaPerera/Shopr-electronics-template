import React from 'react';
import { Menu, Segment, Sticky } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { get } from 'lodash';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

const CategoryMenu = (props) => {
  const {
    categories, contextRef, storeCustomization, handleCategoryClick, selectedCategory,
  } = props;

  if (!isLoaded(storeCustomization)) {
    return <div>Loading...</div>;
  }

  if (!isLoaded(categories)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(categories)) {
    return <div>No categories to display...</div>;
  }

  const color = storeCustomization.color ? storeCustomization.color : null;

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
            <Menu.Item
              as="a"
              name="All"
              active={selectedCategory === 'All'}
              onClick={handleCategoryClick}
            />
            {Object.keys(categories).map((key) => {
              const { name } = categories[key];
              return (
                <Menu.Item
                  as="a"
                  name={name}
                  active={selectedCategory === name}
                  onClick={handleCategoryClick}
                  key={key}
                />
              );
            })}
          </Menu>
        </div>

      </Segment>
    </Sticky>

  );
};

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
  selectedCategory: PropTypes.string.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  storeCustomization: PropTypes.object.isRequired,
};
