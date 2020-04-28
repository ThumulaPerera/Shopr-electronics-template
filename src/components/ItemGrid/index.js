import React from 'react';
import {
  Card, Segment, Header, Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { get } from 'lodash';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import ItemCard from '../ItemCard';
import calculateRating from '../../helpers/calculateRating';
import getItemsAndIconByCategory from '../../helpers/getItemsAndIconByCategory';

const ItemGrid = (props) => {
  let { items } = props;
  const {
    categories, selectedCategory, url, currency,
  } = props;
  const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg';
  let icon;

  if (!(isLoaded(items) && isLoaded(categories))) {
    return <div>Loading...</div>;
  }

  if (isLoaded(items) && isLoaded(categories)) {
    const filtered = getItemsAndIconByCategory(items, categories, selectedCategory);
    items = filtered.itemsOfSelectedCategory;
    icon = filtered.categoryIcon;
  }

  if (!items || isEmpty(items)) {
    return (
      <Segment basic>
        <Header as="h2">
          <Header.Content>
            {icon ? <Icon name={icon} /> : null}
            {selectedCategory}
          </Header.Content>
        </Header>
        <div>No items to display....</div>
      </Segment>
    );
  }

  return (

    <Segment basic padded="very">
      <Header as="h2">
        <Header.Content>
          {icon ? <Icon name={icon} /> : null}
          {selectedCategory}
        </Header.Content>
      </Header>
      <Card.Group itemsPerRow="4">
        {Object.keys(items).map((itemKey) => {
          const {
            name, photos, description, basePrice, rating, discount,
          } = items[itemKey];

          const imageURL = photos && photos[0] ? photos[0].url : defaultImgUrl;
          const amount = basePrice;
          const itemRating = rating ? calculateRating(rating) : null;

          const minRequirementsToDisplay = name && basePrice;

          if (!minRequirementsToDisplay) {
            return null;
          }

          return (
            <ItemCard
              key={itemKey}
              id={itemKey}
              name={name}
              imageURL={imageURL}
              description={description}
              currency={currency}
              price={amount}
              rating={itemRating}
              discount={discount}
              url={url}
            />
          );
        })}
      </Card.Group>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  items: get(state.firestore.data, 'sellerItems'),
  categories: get(state.firestore.data, 'sellerStore.categories'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
});

function withHooks(Component) {
  return function WrappedComponent(props) {
    const { storeID, category } = useParams();
    return (
      <Component
        {...props}
        storeID={storeID}
        // eslint-disable-next-line
        selectedCategory={category || props.selectedCategory}
      />
    );
  };
}

export default compose(
  withHooks,
  connect(mapStateToProps),
)(ItemGrid);

ItemGrid.propTypes = {
  categories: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
