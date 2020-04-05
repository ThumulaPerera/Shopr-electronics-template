import React, { Component, createRef } from 'react'
import { Menu, Segment, Sticky } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { get } from 'lodash'
import { compose } from 'redux';
import { Link, useRouteMatch } from 'react-router-dom';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';
import { CATEGORIES_ROUTE } from '../../constants/routes'

class CategoryMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    contextRef = createRef();

    render() {
        const { activeItem } = this.state
        const { categories, contextRef, url } = this.props

        if (!isLoaded(categories)) {
            return <div>Loading...</div>
        }

        if (isEmpty(categories)) {
            return <div>No items to display...</div>
        }

        return (
            <Sticky
                context={contextRef}
                offset={60}
            >
                <Segment padded inverted>
                    <Segment textAlign='center' size='large' inverted>
                        Categories
                    </Segment>
                    <div style={{ overflow: 'auto', maxHeight: 500 }}>
                        <Menu pointing secondary vertical fluid inverted>
                            {Object.keys(categories).map(key => {
                                const { name } = categories[key];
                                return (
                                    <Link to={`${url}/${name}`} key={key}>
                                        <Menu.Item
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

const mapStateToProps = (state, { storeID }) => {
    return ({
        categories: get(state.firestore.data, `stores.${storeID}.categories`),
    });
}

const connectTo = ({ storeID }) => [
    `/stores/${storeID}`
]

function withUrlHook(Component) {
    return function WrappedComponent(props) {
        const { url } = useRouteMatch();
        return <Component {...props} url={applyUrlCorrection(url)} />;
    }
}

export default compose(
    withUrlHook,
    firestoreConnect(connectTo),
    connect(mapStateToProps),
)(CategoryMenu);