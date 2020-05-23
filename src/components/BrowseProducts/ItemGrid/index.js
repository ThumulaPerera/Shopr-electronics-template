import React from 'react';
import {
  Card, Segment, Header, Icon,
} from 'semantic-ui-react';
import { isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import ItemCard from '../../ItemCard';
import calculateRating from '../../../helpers/calculateRating';
import getItemsAndIconByCategory from '../../../helpers/getItemsAndIconByCategory';
import { defaultImgUrl } from '../../../constants/defaults';

const ItemGrid = (props) => {
  let { items } = props;
  const {
    categories, selectedCategory, url, currency,
  } = props;
  const filtered = getItemsAndIconByCategory(items, categories, selectedCategory);
  items = filtered.itemsOfSelectedCategory;
  const icon = filtered.categoryIcon;

  if (!items || isEmpty(items)) {
    return (
      <Segment basic padded="very">
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
      <Card.Group itemsPerRow="3" stackable>
        {Object.keys(items).map((itemKey) => {
          const {
            name, photos, description, basePrice, rating, discount, id,
          } = items[itemKey];

          // eslint-disable-next-line no-nested-ternary
          const imageURL = photos && photos[0]
            ? (photos[0].thumbnail ? photos[0].thumbnail : photos[0].url)
            : defaultImgUrl;
          const amount = basePrice;
          const itemRating = rating ? calculateRating(rating) : null;

          const minRequirementsToDisplay = name && basePrice;

          if (!minRequirementsToDisplay) {
            return null;
          }

          return (
            <ItemCard
              key={id}
              id={id}
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

export default ItemGrid;

ItemGrid.propTypes = {
  categories: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
