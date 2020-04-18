import React from 'react'
import { Table, Label, Icon, Segment, Sticky, Form, Button } from 'semantic-ui-react'

import ItemCard from '../../ItemCard'
import calculateDiscount from '../../../helpers/calculateDiscount'

function ItemTable({ items, currency, cart, url, contextRef, removeItem, changeInProgress, color }) {
    const deleteFromCart = (index) => {
        removeItem(index);
    }

    const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg'

    return (
        <Segment >
        <Sticky context={contextRef} offset={66}>
            <Table basic fixed textAlign='center' color={color} inverted>
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Variant</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
            </Sticky>
        <Table basic fixed textAlign='center'>
            <Table.Body>
                {cart && cart.map((orderItem, index) => {
                    const item = items[orderItem.item]
                    const variantArray = item.subItems[orderItem.subItem].variants
                    const price = item.subItems[orderItem.subItem].price
                    const quantity = orderItem.noOfItems

                    const { name, photos, discount } = item;

                    const discountValue = calculateDiscount(price, discount)

                    const imageURL = photos ? photos[0].url : defaultImgUrl;

                    return (
                        <Table.Row key={index}>
                            <Table.Cell>
                                    <ItemCard 
                                        id={orderItem.item}
                                        name={name}
                                        currency={currency}
                                        price={price}
                                        url={url}
                                        imageURL={imageURL}
                                        discount={discount}
                                        tiny={true}
                                    />
                            </Table.Cell>
                            <Table.Cell verticalAlign='top'>
                                {
                                    variantArray && variantArray.map((variant, key) => (
                                        <Segment compact basic style={{padding:'0px'}} key={key}>
                                        <Label size='large' pointing='left' color={color}>
                                            {item.variants[key].title}
                                            <Label.Detail>{variant}</Label.Detail>
                                        </Label>
                                        </Segment>
                                    ))
                                }
                            </Table.Cell>
                            <Table.Cell>
                                <b>x {quantity}</b>
                            </Table.Cell>
                            <Table.Cell>
                            <b>{currency} {quantity * (price - discountValue)}</b>
                            </Table.Cell>
                            <Table.Cell verticalAlign='top'>
                                <Button
                                    onClick={() => deleteFromCart(index)}
                                    disabled={changeInProgress}
                                    floated='right'
                                    icon
                                    labelPosition='right'
                                    negative
                                >
                                    remove
                                    <Icon name='remove'/>
                            </Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })
                }
            </Table.Body>
        </Table>
        </Segment>
    )
}

export default ItemTable
