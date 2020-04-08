import React from 'react'
import { Container, Icon, Label } from 'semantic-ui-react'

function CurrencyLabel({currency, price}) {
    return (
        <Container textAlign='center'>
            <Label color='red' tag size='huge'>
                <Icon name='money bill alternate outline' />
                {currency} {price}
            </Label>
        </Container>
    )
}

export default CurrencyLabel
