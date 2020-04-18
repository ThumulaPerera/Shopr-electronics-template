import React from 'react'
import { Container, Icon, Label } from 'semantic-ui-react'

import calculateDiscount from '../../helpers/calculateDiscount'

function CurrencyLabel({currency, price, discount}) {
    const discountValue = calculateDiscount(price, discount)

    return (
        <Container textAlign='center'>
            <Label color='red' tag size='huge'>
                {discountValue !== 0 &&
                    <p style={{ textDecoration: 'line-through', fontSize:'1rem' }}> <Icon name='money bill alternate outline' /> {currency} {price.toFixed(2)} </p>
                }
                <p> <Icon name='money bill alternate outline' /> {currency} {(price - discountValue).toFixed(2)} </p>            
            </Label>
        </Container>
    )
}

export default CurrencyLabel
