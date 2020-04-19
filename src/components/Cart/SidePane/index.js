import React from 'react'
import { Grid, Segment, Header, Icon, Container, Button } from 'semantic-ui-react'


function SidePane({ total, color, currency, noOfItems }) {
    return (
        <Segment basic size='massive' >
            <Header as='h2' color={color}>
                {noOfItems} {noOfItems === 1 ? 'item in cart' : 'items in cart'}
            </Header>
            <Header as='h6' color={color}>
                <Icon name='cart' />
                Cart Total :
            </Header>
            <Container textAlign='center'>
                <Header as='h2'>{currency} {total.toFixed(2)}</Header>
            </Container>
            <Segment basic padded='very' textAlign='center' >
                <Button positive size='large'>CHECKOUT</Button>
            </Segment>
        </Segment>
    )
}

export default SidePane
