import React from 'react'
import { Image } from 'semantic-ui-react'

function CoverPhoto({src}) {
    return (
            <Image 
            src={src} 
            fluid
            style={{height : '8rem'}}    
            />
    )
}

export default CoverPhoto