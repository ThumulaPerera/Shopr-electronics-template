import React, { Component, createRef } from 'react'
import { Menu, Segment, Sticky } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { compose } from 'redux';
import { Link, useRouteMatch } from 'react-router-dom';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

class CategoryMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    contextRef = createRef();

    render() {
        const { activeItem } = this.state
        const { categories, contextRef, url, storeCustomization } = this.props

        if(!isLoaded(storeCustomization)){
            return <div>Loading...</div>
        }

        if (!isLoaded(categories)) {
            return <div>Loading...</div>
        }

        if (isEmpty(categories)) {
            return <div>No categories to display...</div>
        }

        const color = storeCustomization.color ? storeCustomization.color : '';

        return (
            <Sticky
                context={contextRef}
                offset={65}
            >
                <Segment padded inverted basic color={color}>
                    <Segment textAlign='center' size='large' inverted color={color}>
                        Categories
                    </Segment>
                    <div style={{ overflow: 'auto', maxHeight: 500 }}>
                        <Menu pointing basic secondary vertical inverted color={color} style={{border:'0px'}}>
                            <Link to={`${url}/`}>
                                <Menu.Item
                                    as='p'
                                    name='All'
                                    active={activeItem === 'All'}
                                    onClick={this.handleItemClick}
                                />
                            </Link>
                            {Object.keys(categories).map(key => {
                                const { name } = categories[key];
                                return (
                                    <Link to={`${url}/${name}`} key={key}>
                                        <Menu.Item
                                            as='p'
                                            name={name}
                                            active={activeItem === name}
                                            onClick={this.handleItemClick}
                                        />
                                    </Link>
                                )
                            })}
                        </Menu>
                    </div>

                </Segment>
            </Sticky>

        )
    }
}

const mapStateToProps = (state) => ({
    categories: get(state.firestore.data, `sellerStore.categories`),
    storeCustomization : get(state.firestore.data, `sellerStore.storeCustomization`),
});

function withHooks(Component) {
    return function WrappedComponent(props) {
        const { url } = useRouteMatch();
        return <Component {...props} url={applyUrlCorrection(url)} />;
    }
}

export default compose(
    withHooks,
    connect(mapStateToProps),
)(CategoryMenu);