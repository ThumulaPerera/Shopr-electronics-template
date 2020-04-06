import React from 'react';
import { Grid } from 'semantic-ui-react';

import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { get } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase'

import ItemGrid from '../ItemGrid';
import CategoryMenu from '../CategoryMenu';

const BrowseProducts = ({ contextRef, categories }) => {
    const { path } = useRouteMatch()

    if (!isLoaded(categories)) {
        return <div>Loading...</div>
    }

    if (isEmpty(categories)) {
        return <div>No categories to display...</div>
    }

    return(
    <Grid columns={2} divided>
        <Grid.Row>
            <Grid.Column width={3}>
                <CategoryMenu contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column width={13}>
                <Switch>
                    <Route exact path={`${path}/`}>
                            {
                                categories.map(({ name }) => (
                                    <div>
                                        <ItemGrid selectedCategory={name} />
                                    </div>
                                ))
                            }
                    </Route>
                    <Route path={`${path}/:category`}>
                        <ItemGrid />
                    </Route>
                </Switch>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)}

const mapStateToProps = (state) => ({
    categories: get(state.firestore.data, `sellerStore.categories`),
});


export default compose(
    connect(mapStateToProps),
)(BrowseProducts);
