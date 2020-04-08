import React from 'react'
import { Segment, Grid, Header, Container, Divider, Icon, Label } from 'semantic-ui-react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { get } from 'lodash';
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';

import RatingDisplay from '../RatingDisplay'
import CurrencyLabel from './CurrencyLabel'
import InStockLabel from './InStockLabel'
import OutOfStockLabel from './OutOfStockLabel'

import calculateRating from '../../helpers/calculateRating';
import getCorrespondingSubItem from '../../helpers/getCorrespondingSubItem';
import AddToCartForm from '../AddToCartForm'

const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', text: 'Australia' },
    { key: 'at', value: 'at', text: 'Austria' },
    { key: 'az', value: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', text: 'Benin' },
  ]

const ItemPage = ({ item, subItems, selectedVariants }) => {
    if (!(isLoaded(item))) {
        return <div>Loading...</div>
    }

    //TODO handle is empty
    if(isEmpty(item)){
        return <div>No item...</div>
    }

    const { name, photos, rating, description, attributes, basePrice } = item
    const itemRating = calculateRating(rating);
    let selectedSubItem = {}

    if(isLoaded(selectedVariants) && isLoaded(subItems)){
        selectedSubItem = getCorrespondingSubItem(subItems, selectedVariants)
        console.log('selected :',selectedSubItem)
    }

    return(
    <Segment>
        <Grid columns={2} divided>
            <Grid.Column>
                <Segment basic>
                    <Carousel showArrows={true} infiniteLoop={true} showIndicators={false} >
                        {photos && photos.map((photo, key) => (
                            <div key={key}>
                                <img src={photo.url} />
                                <p className="legend">{photo.title}</p>
                            </div>)
                        )}
                    </Carousel>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment basic>
                    <Header size='huge'>{name}</Header>

                    <RatingDisplay rating={itemRating}/>

                    <Divider />

                    <Container textAlign='justified'>
                        <p>
                            {description}
                        </p>
                    </Container>

                    <Divider />

                    <Grid columns={2}>
                        {attributes.map(({ title, attribute }, key) => (
                            <Grid.Row key={key}>
                                <Grid.Column textAlign='right' width={4}>
                                    <p>
                                        {title} :
                            </p>
                                </Grid.Column>
                                <Grid.Column textAlign='left' width={12}>
                                    <p>
                                        {attribute}
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        ))}
                    </Grid>

                    <AddToCartForm item={item} subItems={subItems} >
                        <Divider hidden/>

                        {
                            !isEmpty(selectedSubItem) && selectedSubItem.stock !== 0 &&
                            <InStockLabel />
                        }

                        {!isEmpty(selectedSubItem) && selectedSubItem.stock === 0 &&
                            <OutOfStockLabel />
                        }

                        <Divider hidden/>

                        {isEmpty(selectedSubItem) ?
                            <CurrencyLabel price={basePrice} />
                            :
                            <CurrencyLabel price={selectedSubItem.price} />
                        }

                        <Divider hidden/>
                    </AddToCartForm>               
                      
                </Segment>
            </Grid.Column>
        </Grid>
    </Segment>
)}

const mapStateToProps = (state, {match}) => ({
    subItems : get(state.firestore.data, `/Stores/${match.params.storeID}/SubItems`),
    selectedVariants : get(state.form.addToCart, `values`)
}) 

const connectTo = ({ match, item }) => {
    if (!(isLoaded(item))) {
        return []
    }

    if(isEmpty(item)){
        return []
    }
    
    let listners = [];
    item && item.subItems.map((subItem, key) => {
        console.log(subItem.path)
        listners.push({
            collection: `/Stores/${match.params.storeID}/SubItems`,
            doc: subItem.id,
        })
    })
    return listners
}

export default compose(
    connect((state, {match}) => ({
        item: get(state.firestore.data, `sellerItems.${match.params.itemId}`), 
    })),
    firestoreConnect(connectTo),
    connect(mapStateToProps),
)(ItemPage)