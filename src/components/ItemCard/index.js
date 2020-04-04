import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

import RatingDisplay from '../RatingDisplay'

const ItemCard = ({ id, imageURL, name, description, currency, price, rating }) => {
    return (
        <Card onClick={() => {console.log("clicked" + id)}}>
            <Image src={imageURL} wrapped ui={false} />
            <Card.Content>
                <Card.Header textAlign='center'>{name}</Card.Header>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='center' >
                <span style={{ color: 'red' }}>
                    <Icon name='money bill alternate outline' />
                    {currency} {price}
                </span>
            </Card.Content>
            <Card.Content extra textAlign='center'>
                <RatingDisplay rating={rating} />
            </Card.Content>
        </Card>
    )
}

export default ItemCard