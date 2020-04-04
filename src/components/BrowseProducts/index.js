import React, { createRef} from 'react';
import { Grid } from 'semantic-ui-react';

import ItemGrid from '../ItemGrid';
import CategoryMenu from '../CategoryMenu';

import { categories } from '../../constants/mockCategories';
import { useParams } from 'react-router-dom'

const BrowseProducts = ({ contextRef }) => {
    const { storeID } = useParams(); 
    return(
    <Grid columns={2} divided>
        <Grid.Row>
            <Grid.Column width={3}>
                <CategoryMenu catgories={categories} contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column width={13}>
                <ItemGrid storeID={storeID}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)}

export default BrowseProducts