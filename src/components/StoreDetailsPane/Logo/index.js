import React from 'react'
import { Container, Image } from 'semantic-ui-react'

function Logo({src}) {
    return (
        <Container >
            <Image centered src={src} style={{ height: '8rem' }} />
        </Container>
    )
}

export default Logo
