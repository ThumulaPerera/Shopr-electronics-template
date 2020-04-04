import React, { Component, createRef } from 'react'
import { Menu, Segment, Sticky } from 'semantic-ui-react'

export default class CategoryMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    contextRef = createRef();

    render() {
        const { activeItem } = this.state
        const { catgories, contextRef } = this.props

        return (
            <Sticky
                context={contextRef}
                offset={60}
            >
                <Segment padded inverted >
                    <Segment textAlign='center' size='large' inverted>
                        Categories
                    </Segment>
                    <div style={{overflow: 'auto', maxHeight: 500 }}>
                    <Menu pointing secondary vertical fluid inverted>
                        {Object.keys(catgories).map(key => {
                            const { name } = catgories[key];
                            return (
                                <Menu.Item
                                    name={name}
                                    active={activeItem === name}
                                    onClick={this.handleItemClick}
                                />
                            )
                        })}
                    </Menu>
                    </div>
                    
                </Segment>
            </Sticky>

        )
    }
}