import React from 'react';
import { Card, Segment, Header, Icon } from 'semantic-ui-react';

import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import ItemCard from '../ItemCard';
import calculateRating from '../../helpers/calculateRating';
import getItemsAndIconByCategory from '../../helpers/getItemsAndIconByCategory'

const ItemGrid = (props) => {
    console.log('propsss....', props)

    let { items } = props;
    const { categories, selectedCategory } = props;
    let icon;

    if (!(isLoaded(items) && isLoaded(categories))) {
        return <div>Loading...</div>
    }

    if (isLoaded(items) && isLoaded(categories)) {
        const filtered = getItemsAndIconByCategory(items, categories, selectedCategory);
        items = filtered.itemsOfSelectedCategory;
        icon = filtered.categoryIcon;
    }

    if (isEmpty(items)){
        return (
            <Segment basic>
                <Header as='h2'>
                <Header.Content>{icon ? <Icon name={icon} /> : null}{selectedCategory}</Header.Content>
                </Header>
                <div>No items to display....</div>
            </Segment>
        )
    }

    return (

        <Segment basic>
        <Header as='h2'>
            <Header.Content>{icon ? <Icon name={icon} /> : null}{selectedCategory}</Header.Content>
        </Header>
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