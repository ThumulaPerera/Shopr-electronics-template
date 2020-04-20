import React, { Component } from 'react'
import { Accordion, Button, Icon, Grid } from 'semantic-ui-react'
import {Form,Input} from 'semantic-ui-react-form-validator'


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
        const { stockEnabled, stock } = this.props

        let validators = ['required', 'isNumber', 'isPositive'] 
        let errorMessages = [
            'quantity is required', 
            'must be an integer', 
            'must be positive'
        ]
        if(stockEnabled){
            const max = stock ? stock : 0
            validators.push(`maxNumber:${max}`)
            errorMessages.push('insufficient quantity in stock')
        }

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
                <Form onSubmit={this.handleSubmit} >
                    <Grid>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width='10'>
                                <Input
                                    placeholder='quantity'
                                    name='quantity'
                                    value={quantity}
                                    onChange={this.handleChange}
                                    width='16'
                                    type='number'
                                    validators={validators}
                                    errorMessages={errorMessages}
                                />
                            </Grid.Column>
                            <Grid.Column width='6'>
                                <Button floated='right' content='Change' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                </Accordion.Content>
            </Accordion>
        )
    }
}
