import React from 'react';
import {
  Comment, Header, Rating, Statistic, Grid, Progress, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import calculateRatingBreakdown from '../../../helpers/calculateRatingBreakdown';

function ReviewDisplay({ rating, reviews }) {
  const ratingBreakdown = calculateRatingBreakdown(reviews);
  const {
    noOfRatings,
    star5,
    star4,
    star3,
    star2,
    star1,
  } = ratingBreakdown;
  return (
    <div>
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width="6" textAlign="center">
            <Statistic>
              <Statistic.Value>{rating.toFixed(1)}</Statistic.Value>
              <Statistic.Label>
                <Rating defaultRating={rating} maxRating={5} size="large" disabled />
              </Statistic.Label>
              <small>
                {noOfRatings}
                {' '}
                product ratings
              </small>
            </Statistic>
          </Grid.Column>
          <Grid.Column width="10">
            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Progress
              value={star5}
              total={noOfRatings}
              size="tiny"
              style={{ marginBottom: '.5em', marginTop: '0' }}
            />

            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Progress
              value={star4}
              total={noOfRatings}
              size="tiny"
              style={{ marginBottom: '.5em', marginTop: '0' }}
            />

            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Progress
              value={star3}
              total={noOfRatings}
              size="tiny"
              style={{ marginBottom: '.5em', marginTop: '0' }}
            />

            <Icon name="star" size="small" />
            <Icon name="star" size="small" />
            <Progress
              value={star2}
              total={noOfRatings}
              size="tiny"
              style={{ marginBottom: '.5em', marginTop: '0' }}
            />

            <Icon name="star" size="small" />
            <Progress
              value={star1}
              total={noOfRatings}
              size="tiny"
              style={{ marginBottom: '.5em', marginTop: '0' }}
            />

          </Grid.Column>
        </Grid.Row>
      </Grid>
      {reviews
      && Array.isArray(reviews)
      && reviews.length > 0
      && (
      <Comment.Group>
        <Header as="h3" dividing>
          Reviews
        </Header>
        {reviews.map((review) => {
          const {
            buyerName, buyerImg, rating, comment,
          } = review;
          return (
            <Comment>
              <Comment.Avatar as="a" src={buyerImg} />
              <Comment.Content>
                <Comment.Author as="a">{buyerName}</Comment.Author>
                <Comment.Text>
                  <Rating defaultRating={rating} maxRating={5} disabled />
                </Comment.Text>
                <Comment.Text>{comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          );
        })}
      </Comment.Group>
      )}
    </div>
  );
}

export default ReviewDisplay;

ReviewDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.array.isRequired,
};
