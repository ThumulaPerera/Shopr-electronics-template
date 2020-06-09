import React, {
  useState, Component,
} from 'react';
import {
  Card, Segment, Header, Icon, Pagination,
} from 'semantic-ui-react';
import { isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import ItemCard from '../../ItemCard';
import calculateRating from '../../../helpers/calculateRating';
import getItemsAndIconByCategory from '../../../helpers/getItemsAndIconByCategory';
import { defaultImgUrl } from '../../../constants/defaults';
import paginate from '../../../helpers/paginate';
import calculateDiscount from '../../../helpers/calculateDiscount';

const ItemGrid = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [prevCategory, setPrevCategory] = useState(null);

  let { items } = props;
  const {
    categories, selectedCategory, url, currency, ratingEnabled, sortBy,
  } = props;

  const handlePaginationChange = (e, { activePage }) => setActivePage(activePage);

  // set the number of items to display per row in card group
  const itemsPerRow = 3;

  // set the number of items to display per page (make sure this is a multiple of items per row)
  const itemsPerPage = itemsPerRow * 1;

  const filtered = getItemsAndIconByCategory(items, categories, selectedCategory);
  items = filtered.itemsOfSelectedCategory;
  const icon = filtered.categoryIcon;

  const noOfPages = Math.ceil(items.length / itemsPerPage);

  // reset active page to 1 when selected category is changed
  if (selectedCategory !== prevCategory) {
    setActivePage(1);
    setPrevCategory(selectedCategory);
  }

  switch (sortBy) {
    case 'Price: Low to High': {
      items.sort((a, b) => {
        const priceA = a.basePrice - calculateDiscount(a.basePrice, a.discount);
        const priceB = b.basePrice - calculateDiscount(b.basePrice, b.discount);
        return priceA - priceB;
      });
      break;
    }
    case 'Price: High to Low': {
      items.sort((a, b) => {
        const priceA = a.basePrice - calculateDiscount(a.basePrice, a.discount);
        const priceB = b.basePrice - calculateDiscount(b.basePrice, b.discount);
        return priceB - priceA;
      });
      break;
    }
    case 'Name: A - Z': {
      items.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
      break;
    }
    case 'Name: Z - A': {
      items.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (x > y) { return -1; }
        if (x < y) { return 1; }
        return 0;
      });
      break;
    }
    default:
  }


  items = paginate(items, activePage, itemsPerPage);

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
      <Segment basic textAlign="center">
        <Pagination
          activePage={activePage}
          onPageChange={handlePaginationChange}
          totalPages={noOfPages}
        />
      </Segment>
      <Card.Group itemsPerRow={itemsPerRow} stackable>
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
  categories: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
};
