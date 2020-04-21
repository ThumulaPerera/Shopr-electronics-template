import React from 'react'
import { Container, Label } from 'semantic-ui-react'

function InStockLabel({quantity}) {
    return (
        <Container textAlign='center'>
            <Label color='green' tag size='large'>
                {quantity} in stock
            </Label>
        </Container>
    )
}

export default InStockLabel