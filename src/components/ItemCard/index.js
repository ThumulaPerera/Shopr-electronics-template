import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import RatingDisplay from '../RatingDisplay'
import { ITEMS_ROUTE } from '../../constants/routes'

const ItemCard = ({ id, imageURL, name, description, currency, price, rating, url, history }) => {
    const onClick = () => {
        history.push(`${url}${ITEMS_ROUTE}/${id}`)
    }

    return (
        <Card onClick={onClick} raised>
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
            {rating && <Card.Content extra textAlign='center'>
                <RatingDisplay rating={rating} />
            </Card.Content>}
        </Card>
    )
}

export default withRouter(ItemCard)