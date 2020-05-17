import React from 'react';
import { Item, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { defaultImgUrl } from '../../../constants/defaults';
import ShowVariantsAccordian from '../../ShowVariantsAccordian';

function PurchasedItem({
  // eslint-disable-next-line no-unused-vars
  item, orderItem, currency, ratingEnabled,
}) {
  const { noOfItems, unitPrice } = orderItem;
  const subItemId = orderItem.subItem;
  const { name, photos, subItems } = item;
  const subItem = subItems[subItemId];
  const variantArray = subItem.variants;
  const price = currency.concat(' ', unitPrice.toFixed(2).toString());
  const subTotal = currency.concat(' ', (unitPrice * noOfItems).toFixed(2).toString());
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
          <Item.Header as="a">{name}</Item.Header>
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
          <Item.Extra>
            <Button primary floated="right">
              Buy tickets
            </Button>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default PurchasedItem;

PurchasedItem.propTypes = {
  item: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
  orderItem: PropTypes.object.isRequired,
};
