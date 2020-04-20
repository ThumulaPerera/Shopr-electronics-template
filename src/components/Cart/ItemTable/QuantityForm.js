import React, { Component } from 'react'
import { Form, Accordion, Button, Icon } from 'semantic-ui-react'
// import {Form,Input} from 'semantic-ui-react-form-validator'


export default class QuantityForm extends Component {
    state = {
        quantity: this.props.currentQuantity,
        activeIndex: -1
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { quantity } = this.state
        const { index } = this.props
        this.props.editItemQuantity(index, quantity)
        this.setState({ activeIndex: -1 })
    }

    handleAccordianClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
        if(activeIndex === index){
            this.setState({ quantity: this.props.currentQuantity })
        }
    }

    render() {
        const { quantity, activeIndex } = this.state

        return (
            
            <Accordion>
                <Accordion.Title
                    as={Button}
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleAccordianClick}
                    fluid
                >
                    <Icon name='edit' />
                    Change Quantity
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                <Form size='small' onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input
                            placeholder='quantity'
                            name='quantity'
                            value={quantity}
                            onChange={this.handleChange}
                            type='number'
                        />
                        <Form.Button size='tiny' content='Change' />
                    </Form.Group>
                </Form>
                </Accordion.Content>
            </Accordion>
        )
    }
}
