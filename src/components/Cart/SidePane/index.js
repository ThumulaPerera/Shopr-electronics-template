import React from 'react'
import { Grid, Segment, Header, Icon, Container, Button } from 'semantic-ui-react'


function SidePane({ total, color, currency }) {
    return (
        <Segment basic padded='very' color={color} secondary inverted size='massive' style={{height:'30rem'}}>
            <Header as='h6'>
                <Icon name='cart' />
                Cart Total :
            </Header>
            <Container textAlign='center'>
                <Header as='h2'>{currency} {total.toFixed(2)}</Header>
            </Container>
            <Segment color={color} secondary inverted textAlign='center' padded='very'>
                <Button positive size='large'>CHECKOUT</Button>
            </Segment>
        </Segment>
    )
}

export default SidePane
