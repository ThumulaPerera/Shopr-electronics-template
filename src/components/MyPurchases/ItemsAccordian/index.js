import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PurchasedItem from '../PurchasedItem';

class ItemsAccordian extends Component {
    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
      const { index } = titleProps;
      const { activeIndex } = this.state;
      const newIndex = activeIndex === index ? -1 : index;

      this.setState({ activeIndex: newIndex });
    }


    render() {
      const { activeIndex } = this.state;
      const {
        orderItems, items, currency, ratingEnabled,
      } = this.props;

      return (
        orderItems
            && (
            <Accordion>
              {
                  orderItems.map((orderItem, key) => {
                    const itemId = orderItem.item;
                    const item = items[itemId];
                    const { name } = item;
                    return (
                      <div key={itemId}>
                        <Accordion.Title
                          active={activeIndex === key}
                          index={key}
                          onClick={this.handleClick}
                        >
                          <Icon name="dropdown" />
                          {name}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === key}>
                          <PurchasedItem
                            item={item}
                            orderItem={orderItem}
                            currency={currency}
                            ratingEnabled={ratingEnabled}
                          />
                        </Accordion.Content>
                      </div>
                    );
                  })
              }
            </Accordion>
            )
      );
    }
}

export default ItemsAccordian;

ItemsAccordian.propTypes = {
  items: PropTypes.object,
  currency: PropTypes.string.isRequired,
  ratingEnabled: PropTypes.bool.isRequired,
  orderItems: PropTypes.array,
};

ItemsAccordian.defaultProps = {
  items: undefined,
  orderItems: undefined,
};
