import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form, Container, Message,
} from 'semantic-ui-react';
import { isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

import { signInWithFb } from '../../actions/authActions';
import { addToCart } from './addToCart';
import { required, integer, positive } from './validators';

function AddToCartForm({
  item,
  selectedSubItem,
  selectedValues,
  children,
  handleSubmit,
  errors,
  submitFailed,
  anyTouched,
  submitting,
  stockEnabled,
}) {
  // same variable is used in add to cart function as well
  const addToCartDisabled = isEmpty(selectedSubItem)
        || !selectedSubItem.stock
        || selectedSubItem.stock === 0
        || (selectedValues.quantity > selectedSubItem.stock && stockEnabled);

  const warningList = [];
  if (isEmpty(selectedSubItem) || selectedSubItem.stock === null) {
    warningList.push('An item matching the selection is not available');
  } else if (selectedSubItem.stock > -1) {
    if (selectedSubItem.stock === 0) {
      warningList.push('The item is out of stock');
    } else if (selectedValues.quantity > selectedSubItem.stock) {
      warningList.push('Insufficient quantity of items in stock');
    }
  }
  console.log(warningList);

  const renderSelect = (field) => (
    <Form.Select
      label={field.label}
      name={field.input.name}
      onChange={(e, { value }) => field.input.onChange(value)}
      options={field.options}
      placeholder={field.placeholder}
      value={field.input.value}
      error={
                submitFailed && errors && errors[field.input.name]
                  ? {
                    content: errors[field.input.name],
                    pointing: 'below',
                  }
                  : null
            }
    />
  );

  return (
    <>
      <Form onSubmit={handleSubmit} warning={anyTouched && addToCartDisabled}>
        {
                    item && item.variants && item.variants.map((variant) => {
                      const { title, attributes } = variant;
                      const options = [];
                      attributes.map((attribute) => {
                        options.push({
                          key: attribute.attribute,
                          text: attribute.attribute,
                          value: attribute.attribute,
                        });
                        return null;
                      });
                      return (
                        <Field
                          component={renderSelect}
                          label={title}
                          name={title}
                          options={options}
                          placeholder={title}
                          key={title}
                          validate={required}
                        />
                      );
                    })
                }
        {children}

        <Field
          component={Form.Input}
          type="number"
          label="quantity"
          name="quantity"
          placeholder="quantity"
          validate={[required, integer, positive]}
          error={
                        submitFailed && errors && errors.quantity
                          ? {
                            content: errors.quantity,
                            pointing: 'below',
                          }
                          : null
                    }
        />

        <Container textAlign="center">
          <Form.Button
            primary
            disabled={addToCartDisabled || submitting}
          >
            Add To Cart
          </Form.Button>
        </Container>
        <Message
          warning
          header="Cannot Add Item To Cart!"
          list={warningList}
        />
      </Form>
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedValues: get(state.form.addToCart, 'values'),
  errors: get(state.form.addToCart, 'syncErrors'),
  buyerId: get(state.firebase.auth, 'uid'),
});

const mapDispatchToProps = (dispatch, { storeId, firestore }) => ({
  signIn: () => dispatch(signInWithFb(storeId, firestore)),
});

function withHooks(Component) {
  return function WrappedComponent(props) {
    const match = useRouteMatch();
    return <Component {...props} storeId={match.params.storeID} />;
  };
}


export default compose(
  withHooks,
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'addToCart',
    onSubmit: addToCart,
  }),
)(AddToCartForm);

AddToCartForm.propTypes = {
  item: PropTypes.object.isRequired,
  selectedSubItem: PropTypes.object.isRequired,
  selectedValues: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  anyTouched: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  stockEnabled: PropTypes.bool.isRequired,
};
