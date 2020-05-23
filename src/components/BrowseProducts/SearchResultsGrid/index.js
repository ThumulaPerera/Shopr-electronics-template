import React from 'react';
import {
  Card, Segment,
} from 'semantic-ui-react';
import { isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import ItemCard from '../../ItemCard';
import calculateRating from '../../../helpers/calculateRating';

const ItemGrid = (props) => {
  const {
    items, url, currency, searchString,
  } = props;
  const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg';


  if (!items || isEmpty(items)) {
    return null;
  }

  const filteredItems = items.filter((item) => (
    item.name.search(new RegExp(searchString, 'i')) !== -1
  ));

  if (!filteredItems || isEmpty(filteredItems)) {
    return null;
  }

  return (
    <Segment basic padded="very">
      <Card.Group itemsPerRow="3" stackable>
        {Object.keys(filteredItems).map((itemKey) => {
          const {
            name, photos, description, basePrice, rating, discount, id,
          } = filteredItems[itemKey];

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
  items: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
