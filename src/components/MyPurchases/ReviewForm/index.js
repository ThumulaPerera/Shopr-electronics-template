import React, { Component } from 'react';
import {
  Form, Rating, TextArea, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ReviewForm extends Component {
  state = {
    rating: 0,
    review: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleRate = (e, { rating }) => this.setState({ rating })

  handleSubmit = () => {
    const { rating, review } = this.state;
    const { item, addReview } = this.props;

    console.log(rating);
    console.log(review);

    addReview(item, rating, review);
  }

  render() {
    const {
      review,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>Leave Feedback</h3>
        <Form.Field>
          <Rating maxRating={5} onRate={this.handleRate} />
        </Form.Field>
        <Form.Field>
          <TextArea
            placeholder="Review this item..."
            name="review"
            value={review}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Button content="Submit Feedback" />
        <Divider hidden />
      </Form>
    );
  }
}

export default ReviewForm;

ReviewForm.propTypes = {
  item: PropTypes.object.isRequired,
  addReview: PropTypes.func.isRequired,
};
