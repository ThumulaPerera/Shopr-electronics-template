import React, { Component } from 'react';
import {
  Form, Rating, TextArea, Divider, Accordion, Icon, Header, Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ReviewForm extends Component {
  state = {
    rating: 0,
    review: '',
    activeIndex: -1,
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleRate = (e, { rating }) => this.setState({ rating })

  handleSubmit = () => {
    const { rating, review } = this.state;
    const { item, addReview, changeInProgress } = this.props;

    // console.log(rating);
    // console.log(review);

    if (rating && !changeInProgress) {
      addReview(item, rating, review);
    }
  }

  render() {
    const {
      rating, review, activeIndex,
    } = this.state;
    const { changeInProgress } = this.props;

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Header color="grey" size="small">
            <Icon name="thumbs up" />
            Leave Feedback
          </Header>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Rating icon="star" maxRating={5} onRate={this.handleRate} clearable />
            </Form.Field>
            <Form.Field>
              <TextArea
                placeholder="Review this item..."
                name="review"
                value={review}
                onChange={this.handleChange}
              />
            </Form.Field>
            {rating
              ? (
                <Form.Button
                  content="Submit Feedback"
                  disabled={changeInProgress}
                  primary
                />
              )
              : (
                <Popup
                  header="Feedback disabled"
                  content="Select a rating to enable"
                  trigger={(
                    <span>
                      <Form.Button
                        content="Submit Feedback"
                        disabled
                        primary
                      />
                    </span>
                )}
                />
              )}
            <Divider hidden />
          </Form>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default ReviewForm;

ReviewForm.propTypes = {
  item: PropTypes.object.isRequired,
  addReview: PropTypes.func.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
};
