import React, { Component } from 'react';
import {
  Accordion, Button, Icon, Grid,
} from 'semantic-ui-react';
import { Form, Input } from 'semantic-ui-react-form-validator';
import PropTypes from 'prop-types';

class QuantityForm extends Component {
    state = {
      // eslint-disable-next-line react/destructuring-assignment
      quantity: this.props.currentQuantity,
      activeIndex: -1,
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
      const { quantity } = this.state;
      const {
        index, editItemQuantity, removeItem, currentQuantity,
      } = this.props;
      if (quantity === 0) {
        const confirmed = window.confirm('Remove item from cart?');
        if (confirmed) {
          removeItem(index);
        }
      } else {
        const confirmed = window.confirm(`Change the quantity to ${quantity} ?`);
        if (confirmed) {
          editItemQuantity(index, quantity);
        }
      }
      this.setState({ activeIndex: -1, quantity: currentQuantity });
    }

    handleAccordianClick = (e, titleProps) => {
      const { index } = titleProps;
      const { activeIndex } = this.state;
      const newIndex = activeIndex === index ? -1 : index;

      this.setState({ activeIndex: newIndex });
      if (activeIndex === index) {
        const { currentQuantity } = this.props;
        this.setState({ quantity: currentQuantity });
      }
    }

    render() {
      const { quantity, activeIndex } = this.state;
      const {
        stockEnabled, stock, currentQuantity, changeInProgress,
      } = this.props;

      const validators = ['required', 'isNumber', 'isPositive'];
      const errorMessages = [
        'quantity is required',
        'must be an integer',
        'must be positive',
      ];
      if (stockEnabled) {
        const max = stock || 0;
        validators.push(`maxNumber:${max}`);
        errorMessages.push('insufficient quantity in stock');
      } else if (!stock) {
        validators.push('maxNumber:0');
        errorMessages.push('out of stock');
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
            <Icon name="edit" />
            Change Quantity
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form onSubmit={this.handleSubmit}>
              <Grid>
                <Grid.Row verticalAlign="middle">
                  <Grid.Column width="10">
                    <Input
                      placeholder="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={this.handleChange}
                      width="16"
                      type="number"
                      validators={validators}
                      errorMessages={errorMessages}
                    />
                  </Grid.Column>
                  <Grid.Column width="6">
                    <Button floated="right" content="Change" disabled={quantity === currentQuantity || changeInProgress} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Accordion.Content>
        </Accordion>
      );
    }
}

export default QuantityForm;

QuantityForm.propTypes = {
  stockEnabled: PropTypes.bool.isRequired,
  stock: PropTypes.object.isRequired,
  currentQuantity: PropTypes.number.isRequired,
  changeInProgress: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  editItemQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
