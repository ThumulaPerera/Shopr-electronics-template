import React from 'react';
import { Card, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import ItemCard from '../ItemCard';
import calculateRating from '../../helpers/calculateRating';

const ItemGrid = (props) => {
    console.log('propsss....',props)

    let { items } = props;
    const { category } = useParams();

    if (!isLoaded(items)) {
        return <div>Loading...</div>
    }

    if (isEmpty(items)) {
        return <div>No items to display...</div>
    }

    //use category to filter out items
    if(category){
        console.log('category : ', category)
        let newItems = {}
        Object.keys(items).map(key => {
            const item = items[key]
            console.log(item)
            if(item.category.name == category){
                newItems = { ...newItems , item}
            }
        })
        items = newItems;
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

function withHooks(Component) {
    return function WrappedComponent(props) {
        const { storeID } = useParams();
        return <Component {...props} storeID={storeID} />;
    }
}

export default compose(
    withHooks,
    firestoreConnect(connectTo),
    connect(mapStateToProps),
)(ItemGrid);