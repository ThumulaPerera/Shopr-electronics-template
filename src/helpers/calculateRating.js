export default function calculateRating(reviews){
    let totalRating = 0;
    reviews.map((review) => {
        totalRating += review.rating;
    })
    return totalRating/(reviews.length)
}

//just a float value is returned here
//the rendering component automatically maps that float to an int by flooring