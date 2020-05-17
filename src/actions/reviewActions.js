/* eslint-disable import/prefer-default-export */
import { toastr } from 'react-redux-toastr';

import { REVIEW_ACTION_TYPES } from '../constants/actionTypes';

// eslint-disable-next-line max-len
export const addReview = (firestore, item, ratingValue, reviewValue, storeId, buyerId) => (dispatch) => {
  dispatch({ type: REVIEW_ACTION_TYPES.REVIEW_IN_PROGRESS });

  const { id } = item;
  let { reviews, rating } = item;

  if (!rating) {
    rating = {
      ratingCount: 1,
      totalRating: ratingValue,
    };
  } else {
    rating.ratingCount += 1;
    rating.totalRating += ratingValue;
  }

  const review = {
    buyer: buyerId,
    comment: reviewValue,
    rating: ratingValue,
  };

  if (!reviews) {
    reviews = [];
  }

  // remove previous reviews by buyer if exists
  reviews = reviews.map((review) => {
    if (review.buyer === buyerId) {
      rating.ratingCount -= 1;
      rating.totalRating -= review.rating;
      return null;
    }
    return review;
  });
  reviews = reviews.filter((review) => (review !== null));

  reviews.push(review);

  const ItemDocRef = firestore
    .collection('Stores')
    .doc(storeId)
    .collection('Items')
    .doc(id);

  ItemDocRef.update({ rating, reviews })
    .then(() => {
      dispatch({ type: REVIEW_ACTION_TYPES.REVIEW_SUCESS });
      toastr.success('Feedback added');
    })
    .catch((error) => {
      dispatch({ type: REVIEW_ACTION_TYPES.REVIEW_ERROR, error });
      toastr.error('Could not add feedback', error.message);
    });
};
