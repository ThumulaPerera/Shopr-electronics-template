import React, { Component } from 'react';
import {
  Card, Segment,
} from 'semantic-ui-react';
import { isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import ItemCard from '../../ItemCard';
import calculateRating from '../../../helpers/calculateRating';
import { defaultImgUrl } from '../../../constants/defaults';

const ItemGrid = (props) => {
  const {
    items, url, currency, searchString, ratingEnabled,
  } = props;

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
              ratingEnabled={ratingEnabled}
            />
          );
        })}
      </Card.Group>
    </Segment>
  );
};

function withScrollToTop(OriginalReactComponent) {
  return class extends Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }

    componentDidUpdate() {
      window.scrollTo(0, 0);
    }

    render() {
      // return original react component with additional props
      return (
        <OriginalReactComponent {...this.props} />
      );
    }
  };
}

export default withScrollToTop(ItemGrid);

ItemGrid.propTypes = {
  items: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
};
