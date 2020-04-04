import React from 'react';
import { Card, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { compose } from 'redux';

import ItemCard from '../ItemCard';
import calculateRating from '../../helpers/calculateRating';

const ItemGrid = (props) => {
    console.log('propsss....',props)

    const { items } = props;

    if (!isLoaded(items)) {
        return <div>Loading...</div>
    }

    if (isEmpty(items)) {
        return <div>No items to display...</div>
    }

    return (
        <Segment basic>
            <Card.Group>
                {Object.keys(items).map(itemKey => {
                    const { name, photos, description, basePrice, reviews } = items[itemKey];

                    const imageURL = photos[0].url;
                    const { amount } = basePrice ;
                    const currency = basePrice.currency.currency;
                    const rating = calculateRating(reviews);

                    return <ItemCard
                        key={itemKey}
                        id={itemKey}
                        name={name}
                        imageURL={imageURL}
                        description={description}
                        currency={currency}
                        price={amount}
                        rating={rating}
                    />
                })}
            </Card.Group>
        </Segment>
    )
};

const mapStateToProps = (state, { storeID }) => {
    return ({
        items: get(state.firestore.data, `stores.${storeID}.items`),
    });
}

const connectTo = ({ storeID }) => [
    `/stores/${storeID}/items`
]

export default compose(
    firestoreConnect(connectTo),
    connect(mapStateToProps),
)(ItemGrid);