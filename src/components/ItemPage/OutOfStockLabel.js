import React from 'react'
import { Container, Label } from 'semantic-ui-react'

function OutOfStockLabel() {
    return (
        <Container textAlign='center'>
            <Label color='grey' tag size='huge'>
                Out of stock
            </Label>
        </Container>
    )
}

export default OutOfStockLabel