import React, { createRef} from 'react';
import { Grid } from 'semantic-ui-react';

import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';

import ItemGrid from '../ItemGrid';
import CategoryMenu from '../CategoryMenu';
import { CATEGORIES_ROUTE } from '../../constants/routes'

const BrowseProducts = ({ contextRef }) => {
    const { storeID } = useParams(); 
    const { path } = useRouteMatch()

    return(
    <Grid columns={2} divided>
        <Grid.Row>
            <Grid.Column width={3}>
                <CategoryMenu storeID={storeID} contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column width={13}>
                <Switch>
                    <Route exact path={`${path}/`}>
                        <ItemGrid storeID={storeID} />
                    </Route>
                    <Route path={`${path}/:category`}>
                        <ItemGrid storeID={storeID} />
                    </Route>
                </Switch>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)}

export default BrowseProducts