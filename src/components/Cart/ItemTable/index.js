import React from 'react'
import { Table, Label, Container, Segment, Card } from 'semantic-ui-react'

import ItemCard from '../../ItemCard'

function ItemTable({ items, currency, cart, url }) {
    const defaultImgUrl = 'https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-1.jpg'

    return (
        <Table basic fixed textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Variant</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {cart && cart.map((orderItem, index) => {
                    const item = items[orderItem.item]
                    const variantArray = item.subItems[orderItem.subItem].variants
                    const price = item.subItems[orderItem.subItem].price
                    const quantity = orderItem.noOfItems

                    const { name, photos} = item;

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
                                        tiny={true}
                                    />
                            </Table.Cell>
                            <Table.Cell verticalAlign='top'>
                                {
                                    variantArray && variantArray.map((variant, key) => (
                                        <Segment compact basic style={{padding:'0px'}}>
                                        <Label size='large' pointing='left' color='black'>
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
                            <b>{currency} {quantity*price}</b>
                            </Table.Cell>
                        </Table.Row>
                    )
                })
                }
            </Table.Body>
        </Table>
    )
}

export default ItemTable
