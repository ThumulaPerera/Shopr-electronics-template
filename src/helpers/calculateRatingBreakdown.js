export default function calculateRatingBreakdown(reviews) {
  let totalRating = 0;
  let noOfRatings = 0;
  let star5 = 0;
  let star4 = 0;
  let star3 = 0;
  let star2 = 0;
  let star1 = 0;

  if (reviews && Array.isArray(reviews)) {
    reviews.map((review) => {
      totalRating += review.rating;
      noOfRatings += 1;
      switch (review.rating) {
        case 5:
          star5 += 1;
          break;
        case 4:
          star4 += 1;
          break;
        case 3:
          star3 += 1;
          break;
        case 2:
          star2 += 1;
          break;
        case 1:
          star1 += 1;
          break;
        default:
      }
      return null;
    });
  }

  return {
    totalRating,
    noOfRatings,
    star5,
    star4,
    star3,
    star2,
    star1,
  };
}
