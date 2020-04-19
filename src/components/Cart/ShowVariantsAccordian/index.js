import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class AccordionExampleStandard extends Component {
    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        const { variantArray, item } = this.props
        const attributeArray = item.attributes

        return (
            item &&  
            <Accordion>
                {variantArray &&
                <div>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                >
                    <Icon name='dropdown' />
                    Variants
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    {
                         variantArray.map((variant, key) => (
                            <div key={key}>
                                <b>{item.variants[key].title} :</b>
                                <p>{variant}</p>
                                <br/>
                            </div>
                        ))
                    }
                </Accordion.Content>
                </div>
                }
                {attributeArray &&
                <div>
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                    Attributes
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        {
                            attributeArray.map((attribute, key) => (
                                <div key={key}>
                                    <b>{attribute.title} :</b>
                                    <p>{attribute.attribute}</p>
                                    <br/>
                                </div>
                            ))
                        }
                    </Accordion.Content>
                </div>
                }
            </Accordion>
        )
    }
}
