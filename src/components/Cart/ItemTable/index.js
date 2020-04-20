import React, {Component} from 'react'
import { Table, Form, Icon, Segment, Sticky, Button } from 'semantic-ui-react'

import ItemCard from '../../ItemCard'
import ShowVariantsAccordian from '../ShowVariantsAccordian'
import QuantityForm from './QuantityForm'
import calculateDiscount from '../../../helpers/calculateDiscount'
import calculateRating from '../../../helpers/calculateRating'

class ItemTable extends Component {

    deleteFromCart = (index) => {
        this.props.removeItem(index);
    }

    render(){
    const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg'
    const { items, currency, cart, url, contextRef, editItemQuantity, changeInProgress, color } = this.props
    return (
        <Segment basic>
        <Sticky context={contextRef} offset={75}>
            <Table fixed textAlign='center' color={color}>
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Variants and Attributes</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
        </Sticky>
        <div style={{maxHeight:'70vh', overflowY:'scroll', marginTop:'.5rem'}}>
        <Table basic='very' fixed textAlign='center' >
            <Table.Body >
                {cart && cart.map((orderItem, index) => {
                    const item = items[orderItem.item]
                    const variantArray = item.subItems[orderItem.subItem].variants
                    const price = item.subItems[orderItem.subItem].price
                    const quantity = orderItem.noOfItems

                    const { name, photos, discount, rating } = item;

                    const discountValue = calculateDiscount(price, discount)
                    const itemRating = rating ? calculateRating(rating) : null;
                    const imageURL = photos && photos[0] ? photos[0].url : defaultImgUrl;

                    return (
                        <Table.Row key={index}>
                            <Table.Cell style={{padding : '1rem'}}>
                                    <ItemCard 
                                        id={orderItem.item}
                                        name={name}
                                        currency={currency}
                                        price={price}
                                        url={url}
                                        imageURL={imageURL}
                                        discount={discount}
                                        rating={itemRating}
                                        tiny={true}
                                    />
                            </Table.Cell>
                            <Table.Cell verticalAlign='top' textAlign='left'>
                                <ShowVariantsAccordian variantArray={variantArray} item={item}/>
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                                <p><b>x {quantity}</b></p>
                                <QuantityForm 
                                    index={index} 
                                    editItemQuantity={editItemQuantity}
                                    currentQuantity={quantity}
                                />  
                                <br/>
                                <Button
                                    as='a'
                                    onClick={() => this.deleteFromCart(index)}
                                    disabled={changeInProgress}
                                    basic
                                    negative
                                    fluid
                                >
                                    Remove from cart
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                            <b>{currency} {(quantity * (price - discountValue).toFixed(2)).toFixed(2)}</b>
                            </Table.Cell>
                        </Table.Row>
                    )
                })
                }
            </Table.Body>
        </Table>
        </div>
        </Segment>
    )
    }  
}

export default ItemTable
