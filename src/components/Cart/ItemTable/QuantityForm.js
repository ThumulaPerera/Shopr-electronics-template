import React, { Component } from 'react'
import { Accordion, Button, Icon, Grid, Confirm } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react-form-validator'


export default class QuantityForm extends Component {
    state = {
        quantity: this.props.currentQuantity,
        activeIndex: -1,
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { quantity } = this.state
        const { index, editItemQuantity, removeItem, currentQuantity } = this.props
        if (quantity == 0) {
            const confirmed = window.confirm('Remove item from cart?')  
            if(confirmed){
                removeItem(index)
            }
        } else {
            const confirmed = window.confirm(`Change the quantity to ${quantity} ?`)  
            if(confirmed){
                editItemQuantity(index, quantity)
            }
        }
        this.setState({ activeIndex: -1, quantity: this.props.currentQuantity })
    }

    handleAccordianClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
        if (activeIndex === index) {
            this.setState({ quantity: this.props.currentQuantity })
        }
    }

    render() {
        const { quantity, activeIndex, open } = this.state
        const { stockEnabled, stock, currentQuantity, changeInProgress } = this.props

        let validators = ['required', 'isNumber', 'isPositive']
        let errorMessages = [
            'quantity is required',
            'must be an integer',
            'must be positive'
        ]
        if (stockEnabled) {
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
                    <Form onSubmit={this.handleSubmit}>
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
                                    <Button floated='right' content='Change' disabled={quantity===currentQuantity || changeInProgress}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Accordion.Content>
            </Accordion>
        )
    }
}
