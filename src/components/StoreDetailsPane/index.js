import React from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { compose } from 'redux';

import CoverPhoto from './CoverPhoto'
import Logo from './Logo'

function StoreDetailsPane({ storeCustomization }) {
    if(!isLoaded(storeCustomization)){
        return <Loader />
    }

    const logo = storeCustomization.logo ? storeCustomization.logo : '';
    const cover = storeCustomization.coverPhotos && storeCustomization.coverPhotos.main[0] ? storeCustomization.coverPhotos.main[0] : '';
    const color = storeCustomization.color ? storeCustomization.color : '';

    console.log('logo',logo)
    console.log('cover',cover)

    if (logo === '' && cover === ''){
        return null
    }

    if (cover === ''){
        return (
            // <div style={{ height: '8rem' }}>
                <Grid>
                    <Grid.Row color={color}>
                        <Grid.Column stretched width='16' verticalAlign='middle'>
                            <Logo src={logo}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            // </div>
        )
    }

    return (
        // <div style={{ height: '8rem' }}>
            <Grid>
                <Grid.Row columns='2' color={color}>
                    <Grid.Column stretched width='4' verticalAlign='middle'>
                        <Logo src={logo}/>
                    </Grid.Column>
                    <Grid.Column width='12'>
                        <CoverPhoto src={cover}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        // </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        storeCustomization : get(state.firestore.data, `sellerStore.storeCustomization`),
    });
}

export default compose(
    connect(mapStateToProps),
)(StoreDetailsPane);

