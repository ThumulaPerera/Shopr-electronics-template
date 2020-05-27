/* //calculate rating using reviews

export default function calculateRating(reviews){
    let totalRating = 0;
    reviews.map((review) => {
        totalRating += review.rating;
    })
    return totalRating/(reviews.length)
    //just a float value is returned here
    //the rendering component automatically maps that float to an int by flooring
} */


/* calculate rating using rating */

// takes in rating object as input
// returns a float
// returns 0 for any invalid input
export default function calculateRating(rating) {
  if (!rating || !rating.totalRating || !rating.ratingCount) {
    return 0;
  }
  const { totalRating, ratingCount } = rating;
  return Number.isInteger(totalRating) && Number.isInteger(ratingCount)
    ? totalRating / ratingCount
    : 0;
}
