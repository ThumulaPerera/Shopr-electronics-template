import React from 'react';
import {
  Segment, Grid, Header, Container, Divider, Image, Label,
} from 'semantic-ui-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import RatingDisplay from '../RatingDisplay';
import CurrencyLabel from './CurrencyLabel';
import InStockLabel from './InStockLabel';
import OutOfStockLabel from './OutOfStockLabel';

import calculateRating from '../../helpers/calculateRating';
import getCorrespondingSubItem from '../../helpers/getCorrespondingSubItem';
import calculateDiscount from '../../helpers/calculateDiscount';
import AddToCartForm from '../AddToCartForm';

const ItemPage = ({
  item, selectedVariants, match, currency, stockEnabled, color,
}) => {
  if (!(isLoaded(item))) {
    return <div>Loading...</div>;
  }

  // TODO handle is empty
  if (isEmpty(item)) {
    return <div>No item...</div>;
  }

  const {
    name, photos, rating, description, attributes, basePrice, discount,
  } = item;
  const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg';
  const itemRating = rating ? calculateRating(rating) : null;
  const baseDiscount = calculateDiscount(basePrice, discount);
  let selectedSubItem = {};

  if (isLoaded(selectedVariants) && isLoaded(item)) {
    selectedSubItem = getCorrespondingSubItem(item, selectedVariants);
    console.log('selected :', selectedSubItem);
  }

  return (
    <Segment basic padded>
      <Grid columns={3} relaxed="very">
        <Grid.Column width="7">
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
        <Grid.Column width="5">
          <Segment basic>
            {
                        baseDiscount
                          ? (
                            <Label attached="top right" size="huge" color="red">
                              {discount.percentage}
                              {' '}
                              % off
                            </Label>
                          )
                          : null
                    }
            <Header size="huge">{name}</Header>

            <RatingDisplay rating={itemRating} />

            <Divider />

            <Container textAlign="justified">
              <p>
                {description || 'no item description...'}
              </p>
            </Container>

            <Divider />

            <Grid columns={2}>
              {attributes && attributes.map(({ title, attribute }) => (
                <Grid.Row key={title}>
                  <Grid.Column textAlign="right" width={4}>
                    <p>
                      <b>
                        {title}
                        {' '}
                        :
                      </b>
                    </p>
                  </Grid.Column>
                  <Grid.Column textAlign="left" width={12}>
                    <p>
                      {attribute}
                    </p>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width="4">
          <Segment color={color}>
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
  color: PropTypes.string,
};

ItemPage.defaultProps = {
  selectedVariants: undefined,
  color: null,
};
