/* eslint-disable no-undef */
import calculateRatingBreakdown from '../helpers/calculateRatingBreakdown';

const allZeroOutput = {
  totalRating: 0,
  noOfRatings: 0,
  star5: 0,
  star4: 0,
  star3: 0,
  star2: 0,
  star1: 0,
};

it('returns an object with all properties set to zero if reviews is null or empty or not array', () => {
  expect(calculateRatingBreakdown()).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown(null)).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown(undefined)).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown(1)).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown('')).toEqual(allZeroOutput);
});

it('ignores all review objects inside rating array with no review.rating property', () => {
  expect(calculateRatingBreakdown([])).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown([{}])).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown([{}, { rating: null }])).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown([{}, { rating: undefined }])).toEqual(allZeroOutput);
  expect(calculateRatingBreakdown([{}, { rating: 1 }])).toEqual({
    totalRating: 1,
    noOfRatings: 1,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 1,
  });
  expect(calculateRatingBreakdown([{ rating: 0 }, { rating: 1 }])).toEqual({
    totalRating: 1,
    noOfRatings: 1,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 1,
  });
  expect(calculateRatingBreakdown([{ rating: 'dsfs' }, { rating: 1 }])).toEqual({
    totalRating: 1,
    noOfRatings: 1,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 1,
  });
});

it('ignores all review objects inside rating array with review.rating > 5 0r < 1', () => {
  expect(calculateRatingBreakdown([{ rating: 0 }, { rating: 1 }])).toEqual({
    totalRating: 1,
    noOfRatings: 1,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 1,
  });
  expect(calculateRatingBreakdown([{ rating: 6 }, { rating: 1 }])).toEqual({
    totalRating: 1,
    noOfRatings: 1,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 1,
  });
});

it('calculates correct breakdown whwn correct params are passed', () => {
  expect(calculateRatingBreakdown([{ rating: 2 }, { rating: 1 }])).toEqual({
    totalRating: 3,
    noOfRatings: 2,
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 1,
    star1: 1,
  });
  expect(calculateRatingBreakdown([{ rating: 2 }, { rating: 1 }, { rating: 4 }])).toEqual({
    totalRating: 7,
    noOfRatings: 3,
    star5: 0,
    star4: 1,
    star3: 0,
    star2: 1,
    star1: 1,
  });
  expect(calculateRatingBreakdown([{ rating: 2 }, { rating: 2 }, { rating: 4 }])).toEqual({
    totalRating: 8,
    noOfRatings: 3,
    star5: 0,
    star4: 1,
    star3: 0,
    star2: 2,
    star1: 0,
  });
});
