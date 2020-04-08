import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

import FbSignInButton from '../FbSignInButton'

function SignInToContinue({ icon }) {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name={icon} />
                Sign in to view this page
            </Header>
            <FbSignInButton />
        </Segment>
    )
}

export default SignInToContinue
