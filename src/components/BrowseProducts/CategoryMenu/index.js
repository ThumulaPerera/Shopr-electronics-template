import React from 'react';
import {
  Menu, Segment, Sticky, Header, Icon,
} from 'semantic-ui-react';

import { isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import applyUrlCorrection from '../../../helpers/applyUrlCorrection';

const CategoryMenu = (props) => {
  const {
    categories, contextRef, storeCustomization, handleCategoryClick, selectedCategory,
  } = props;

  if (isEmpty(categories)) {
    return <div>No categories to display...</div>;
  }

  let color;
  if (storeCustomization) {
    color = storeCustomization.color;
  }

  return (
    <Sticky
      context={contextRef}
      offset={140}
      pushing
    >
      <Segment padded basic>
        <Header>
          <Icon name="list alternate outline" />
          <Header.Content>Categories</Header.Content>
        </Header>
        <div style={{ overflowY: 'auto', overflowX: 'visible', maxHeight: '40vh' }}>
          <Menu secondary pointing vertical color={color}>
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

function withHooks(Component) {
  return function WrappedComponent(props) {
    const { url } = useRouteMatch();
    return <Component {...props} url={applyUrlCorrection(url)} />;
  };
}

export default compose(
  withHooks,
)(CategoryMenu);

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  contextRef: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  storeCustomization: PropTypes.object.isRequired,
};
