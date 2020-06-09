import React from 'react';
import {
  Item, Grid, Header, Icon, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { defaultImgUrl } from '../../../constants/defaults';
import ShowVariantsAccordian from '../../ShowVariantsAccordian';
import ReviewFrom from '../ReviewForm';
import { ITEMS_ROUTE } from '../../../constants/routes';

function PurchasedItem({
  item,
  orderItem,
  orderStateId,
  currency,
  ratingEnabled,
  addReview,
  changeInProgress,
  buyerId,
  url,
}) {
  const { noOfItems, unitPrice } = orderItem;
  const subItemId = orderItem.subItem;
  const {
    name, photos, subItems, id,
  } = item;
  const subItem = subItems[subItemId];
  const variantArray = subItem.variants;
  const price = currency.concat(' ', unitPrice.toFixed(2).toString());
  const subTotal = currency.concat(' ', (unitPrice * noOfItems).toFixed(2).toString());
  const prevReviews = item.reviews && Array.isArray(item.reviews)
    ? item.reviews.filter((review) => (review.buyer === buyerId)) : [];
  let imgUrl = defaultImgUrl;
  if (photos && photos[0]) {
    if (photos[0].thumbnail) {
      imgUrl = photos[0].thumbnail;
    } else if (photos[0].url) {
      imgUrl = photos[0].url;
    }
  }

  return (
    <Item.Group>
      <Item>
        <Item.Image src={imgUrl} />
        <Item.Content>
          <Item.Header as="a" href={`${url}${ITEMS_ROUTE}/${id}`}>{name}</Item.Header>
          <Grid columns="2">
            <Grid.Column>
              <ShowVariantsAccordian variantArray={variantArray} item={item} />
            </Grid.Column>
            <Grid.Column>
              <Item.Meta>
                Unit price :
              </Item.Meta>
              <Item.Description>
                {price}
              </Item.Description>
              <Item.Meta>
                Quantity :
              </Item.Meta>
              <Item.Description>
                x
                {' '}
                {noOfItems}
              </Item.Description>
              <Item.Meta>
                <b>Sub Total :</b>
              </Item.Meta>
              <Item.Description>
                <h4><b>{subTotal}</b></h4>
              </Item.Description>
            </Grid.Column>
          </Grid>
        </Item.Content>
      </Item>
      {ratingEnabled
      && orderStateId === 2
      && (
        !prevReviews.length
          ? (
            <div>
              <ReviewFrom
                item={item}
                addReview={addReview}
                changeInProgress={changeInProgress}
              />
              <Divider hidden />
            </div>
          )
          : (
            <div>
              <Header color="grey" size="small">
                <Icon name="check" />
                You have provided feedback for this item
              </Header>
              <Divider hidden />
            </div>
          )
      )}
    </Item.Group>
  );
}

export default PurchasedItem;

PurchasedItem.propTypes = {
  item: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
  orderItem: PropTypes.object.isRequired,
  orderStateId: PropTypes.number.isRequired,
  addReview: PropTypes.func.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
  buyerId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
