import React from 'react'
import { Rating } from 'semantic-ui-react'

const RatingDisplay = ({ rating }) => (
  <Rating defaultRating={rating} maxRating={5} disabled />
)

export default RatingDisplay;