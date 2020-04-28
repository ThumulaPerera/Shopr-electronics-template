import React from 'react';
import { Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const RatingDisplay = ({ rating }) => (
  <Rating defaultRating={rating} maxRating={5} disabled />
);

export default RatingDisplay;

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
};
