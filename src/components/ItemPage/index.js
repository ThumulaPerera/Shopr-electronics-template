import React from 'react'
import { Segment, Grid, Header, Container, Divider, Image, Icon, Label } from 'semantic-ui-react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { get } from 'lodash';
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';

import RatingDisplay from '../RatingDisplay'
import CurrencyLabel from './CurrencyLabel'
import InStockLabel from './InStockLabel'
import OutOfStockLabel from './OutOfStockLabel'

import calculateRating from '../../helpers/calculateRating';
import getCorrespondingSubItem from '../../helpers/getCorrespondingSubItem';
import AddToCartForm from '../AddToCartForm'

const ItemPage = ({ item, selectedVariants, match, currency }) => {
    if (!(isLoaded(item))) {
        return <div>Loading...</div>
    }

    //TODO handle is empty
    if(isEmpty(item)){
        return <div>No item...</div>
    }

    const { name, photos, rating, description, attributes, basePrice } = item
    const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg'
    const itemRating = rating ? calculateRating(rating) : null;
    let selectedSubItem = {}

    if(isLoaded(selectedVariants) && isLoaded(item)){
        selectedSubItem = getCorrespondingSubItem(item, selectedVariants)
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
                    {!photos &&
                        <div >
                            <Image src={defaultImgUrl} />
                        </div>
                    }
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment basic>
                    <Header size='huge'>{name}</Header>

                    <RatingDisplay rating={itemRating}/>

                    <Divider />

                    <Container textAlign='justified'>
                        <p>
                            {description ? description : 'no item description...'}
                        </p>
                    </Container>

                    <Divider />

                    <Grid columns={2}>
                        {attributes && attributes.map(({ title, attribute }, key) => (
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

                    <AddToCartForm item={item} selectedSubItem={selectedSubItem} itemId={match.params.itemId}>
                        <Divider hidden/>

                        {
                            !isEmpty(selectedSubItem) && selectedSubItem.stock !== 0 &&
                            <InStockLabel />
                        }

                        {
                            !isEmpty(selectedSubItem) && selectedSubItem.stock === 0 &&
                            <OutOfStockLabel />
                        }

                        <Divider hidden/>

                        {isEmpty(selectedSubItem) ?
                            <CurrencyLabel price={basePrice} currency={currency}/>
                            :
                            <CurrencyLabel price={selectedSubItem.price} currency={currency} />
                        }

                        <Divider hidden/>
                    </AddToCartForm>               
                      
                </Segment>
            </Grid.Column>
        </Grid>
    </Segment>
)}

const mapStateToProps = (state, {match}) => ({
    item: get(state.firestore.data, `sellerItems.${match.params.itemId}`), 
    selectedVariants : get(state.form.addToCart, `values`),
    currency : get(state.firestore.data, `sellerStore.currency`),
}) 

export default compose(
    connect(mapStateToProps),
)(ItemPage)