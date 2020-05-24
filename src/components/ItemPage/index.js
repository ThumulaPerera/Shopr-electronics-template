import React, { useState } from 'react';
import {
  Segment, Grid, Header, Container, Divider, Image, Label, Accordion, Icon, Loader,
} from 'semantic-ui-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import RatingDisplay from '../RatingDisplay';
import CurrencyLabel from './PriceLabel';
import InStockLabel from './InStockLabel';
import OutOfStockLabel from './OutOfStockLabel';

import calculateRating from '../../helpers/calculateRating';
import getCorrespondingSubItem from '../../helpers/getCorrespondingSubItem';
import calculateDiscount from '../../helpers/calculateDiscount';
import AddToCartForm from './AddToCartForm';
import ReviewDisplay from './ReviewDisplay';

const ItemPage = ({
  item, selectedVariants, match, currency, stockEnabled, ratingEnabled, color,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };


  if (!(isLoaded(item))) {
    return <Loader active size="large" />;
  }

  // TODO handle is empty
  if (isEmpty(item)) {
    return <div>No item...</div>;
  }

  const {
    name, photos, rating, description, attributes, basePrice, discount, reviews,
  } = item;
  const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg';
  const itemRating = rating ? calculateRating(rating) : 0;
  const baseDiscount = calculateDiscount(basePrice, discount);
  let selectedSubItem = {};

  if (isLoaded(selectedVariants) && isLoaded(item)) {
    selectedSubItem = getCorrespondingSubItem(item, selectedVariants);
    console.log('selected :', selectedSubItem);
  }

  return (
    <Segment basic padded>
      <Grid columns={2} relaxed="very" doubling stackable>
        <Grid.Column width="11">
          <Grid columns={2} relaxed="very" stackable reversed="mobile">
            <Grid.Column>
              <Segment basic>
                <Carousel showArrows infiniteLoop showIndicators={false}>
                  {photos && photos.map((photo, key) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={key}>
                      <img src={photo.url} alt="" />
                      {/* <p className="legend">{photo.title}</p> */}
                    </div>
                  ))}
                </Carousel>
                {(!photos || photos.length === 0)
                        && (
                        <div>
                          <Image src={defaultImgUrl} />
                        </div>
                        )}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                {
                        baseDiscount
                          ? (
                            <div>
                              <Label attached="top right" size="huge" color="red">
                                {discount.percentage}
                                {' '}
                                % off
                              </Label>
                              <Divider hidden />
                            </div>
                          )
                          : null
                    }

                <Header size="huge">{name}</Header>

                {ratingEnabled && <RatingDisplay rating={itemRating} />}

                <Divider />

                <Container textAlign="justified">
                  <p>
                    {description || 'no item description...'}
                  </p>
                </Container>

                <Divider />

                <Accordion>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleClick}
                  >
                    <Icon name="dropdown" />
                    Attributes
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                    <Grid columns={2}>
                      {attributes && attributes.map(({ title, attribute }) => (
                        <Grid.Row key={title}>
                          <Grid.Column textAlign="right" width={6}>
                            <p>
                              <b>
                                {title}
                                {' '}
                                :
                              </b>
                            </p>
                          </Grid.Column>
                          <Grid.Column textAlign="left" width={10}>
                            <p>
                              {attribute}
                            </p>
                          </Grid.Column>
                        </Grid.Row>
                      ))}
                    </Grid>
                  </Accordion.Content>
                </Accordion>

                {ratingEnabled
                && (
                <div>
                  <Divider />

                  <Accordion>
                    <Accordion.Title
                      active={activeIndex === 1}
                      index={1}
                      onClick={handleClick}
                    >
                      <Icon name="dropdown" />
                      Ratings & Reviews
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                      <ReviewDisplay rating={itemRating} reviews={reviews} />
                    </Accordion.Content>
                  </Accordion>
                </div>
                )}
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width="5">
          <Segment color={color} secondary>
            <AddToCartForm
              item={item}
              selectedSubItem={selectedSubItem}
              itemId={match.params.itemId}
              stockEnabled={stockEnabled}
            >
              <Divider hidden />

              {
                !isEmpty(selectedSubItem)
                && selectedSubItem.stock !== null
                && selectedSubItem.stock !== 0
                && stockEnabled
                && <InStockLabel quantity={selectedSubItem.stock} />
              }

              {
                !isEmpty(selectedSubItem)
                && selectedSubItem.stock !== null
                && selectedSubItem.stock !== 0
                && !stockEnabled
                && <InStockLabel />
              }

              {
                !isEmpty(selectedSubItem)
                && !selectedSubItem.stock
                && <OutOfStockLabel />
              }

              <Divider hidden />

              {(isEmpty(selectedSubItem) || !selectedSubItem.price)
                ? (
                  <CurrencyLabel
                    price={basePrice}
                    currency={currency}
                    discount={discount}
                  />
                )
                : (
                  <CurrencyLabel
                    price={selectedSubItem.price}
                    currency={currency}
                    discount={discount}
                  />
                )}

              <Divider hidden />
            </AddToCartForm>
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = (state, { match }) => ({
  item: get(state.firestore.data, `sellerItems.${match.params.itemId}`),
  selectedVariants: get(state.form.addToCart, 'values'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
  stockEnabled: get(state.firestore.data, 'sellerStore.enableInventoryManagement'),
  ratingEnabled: get(state.firestore.data, 'sellerStore.enableRating'),
  color: get(state.firestore.data, 'sellerStore.storeCustomization.color'),
});

export default compose(
  connect(mapStateToProps),
)(ItemPage);

ItemPage.propTypes = {
  item: PropTypes.object.isRequired,
  selectedVariants: PropTypes.object,
  match: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  stockEnabled: PropTypes.bool.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
  color: PropTypes.string,
};

ItemPage.defaultProps = {
  selectedVariants: undefined,
  color: null,
};
