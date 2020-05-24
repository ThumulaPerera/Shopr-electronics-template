import React from 'react';
import {
  Card, Icon, Image, Label,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import RatingDisplay from '../RatingDisplay';
import { ITEMS_ROUTE } from '../../constants/routes';
import calculateDiscount from '../../helpers/calculateDiscount';

const ItemCard = ({
  id,
  imageURL,
  name,
  description,
  currency,
  price,
  rating,
  ratingEnabled,
  url,
  history,
  tiny,
  discount,
}) => {
  const onClick = () => {
    history.push(`${url}${ITEMS_ROUTE}/${id}`);
  };

  const discountValue = calculateDiscount(price, discount);
  const descriptionMaxLength = 100;

  return (
    <Card onClick={onClick} raised>
      {
                discountValue
                  ? (
                    <Label attached="top right" color="red">
                      {discount.percentage}
                      {' '}
                      % off
                    </Label>
                  )
                  : null
            }
      {tiny
        ? <img src={imageURL} height="100px" style={{ objectFit: 'contain' }} alt="" />
        : <Image src={imageURL} wrapped ui={false} />}
      <Card.Content>
        <Card.Header textAlign="center">{name}</Card.Header>
        {description && (
        <Card.Description>
          {description.length > descriptionMaxLength ? `${description.substring(0, descriptionMaxLength)}...` : description}
        </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra textAlign="center">
        <span style={{ color: 'red' }}>
          {discountValue !== 0
                        && (
                        <p style={{ textDecoration: 'line-through', fontSize: '.9rem', color: 'black' }}>
                          {' '}
                          <Icon name="money bill alternate outline" />
                          {' '}
                          {currency}
                          {' '}
                          {price.toFixed(2)}
                          {' '}
                        </p>
                        )}
          <p>
            {' '}
            <Icon name="money bill alternate outline" />
            {' '}
            {currency}
            {' '}
            {(price - discountValue).toFixed(2)}
            {' '}
          </p>
        </span>
      </Card.Content>
      {ratingEnabled && rating !== null && (
      <Card.Content extra textAlign="center">
        <RatingDisplay rating={rating} />
      </Card.Content>
      )}
    </Card>
  );
};

export default withRouter(ItemCard);

ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  ratingEnabled: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  tiny: PropTypes.bool,
  discount: PropTypes.object,
};

ItemCard.defaultProps = {
  description: '',
  tiny: false,
  discount: null,
  rating: null,
};
