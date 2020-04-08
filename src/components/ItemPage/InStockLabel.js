import React from 'react'
import { Container, Label } from 'semantic-ui-react'

function InStockLabel() {
    return (
        <Container textAlign='center'>
            <Label color='green' tag size='huge'>
                In stock
            </Label>
        </Container>
    )
}

export default InStockLabel