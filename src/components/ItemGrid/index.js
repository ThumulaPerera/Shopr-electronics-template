import React from 'react';
import { Card, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import ItemCard from '../ItemCard';
import calculateRating from '../../helpers/calculateRating';
import filterItemsByCategory from '../../helpers/filterItemsByCategory'

const ItemGrid = (props) => {
    console.log('propsss....', props)

    let { items } = props;
    const { categories, selectedCategory } = props;

    if (!(isLoaded(items) && isLoaded(categories))) {
        return <div>Loading...</div>
    }

    if (isEmpty(items)) {
        return <div>No items to display...</div>
    }

    if (isLoaded(items) && isLoaded(categories)) {
        items = filterItemsByCategory(items, categories, selectedCategory)
    }

    return (
        <Segment basic>
            <Card.Group>
                {Object.keys(items).map(itemKey => {
                    const { name, photos, description, basePrice, reviews } = items[itemKey];

                    const imageURL = photos[0].url;
                    const { amount } = basePrice;
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

const mapStateToProps = (state, { storeID, selectedCategory }) => {
    const categories = get(state.firestore.data, `sellerStore.categories`)
    const items = get(state.firestore.data, `sellerItems`)

    return ({
        items,
        categories
    });
}

function withHooks(Component) {
    return function WrappedComponent(props) {
        const { storeID, category } = useParams();
        return <Component {...props} storeID={storeID} selectedCategory={category ? category : props.selectedCategory} />;
    }
}

export default compose(
    withHooks,
    connect(mapStateToProps),
)(ItemGrid);