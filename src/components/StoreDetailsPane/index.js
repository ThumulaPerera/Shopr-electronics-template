import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

import CoverPhoto from './CoverPhoto'

function StoreDetailsPane() {
    return (
        // <div style={{ height: '8rem' }}>
            <Grid>
                <Grid.Row columns='2' inverted color='black'>
                    <Grid.Column stretched width='4'>
                        <Segment basic/>
                    </Grid.Column>
                    <Grid.Column width='12'>
                        <CoverPhoto />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        // </div>
    )
}

export default StoreDetailsPane
