import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Container } from "semantic-ui-react";
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { get } from 'lodash';
import { withFirestore } from 'react-redux-firebase'
import { useRouteMatch } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'

const renderSelect = field => (
    <Form.Select
      label={field.label}
      name={field.input.name}
      onChange={(e, { value }) => field.input.onChange(value)}
      options={field.options}
      placeholder={field.placeholder}
      value={field.input.value}
    />
);

function AddToCartForm({ item, selectedSubItem, selectedValues, children, buyerId, firestore, storeId, itemId, reset }) {
    const addToCart = () => {
        toastr.warning('Adding item....', 'Adding item to cart. Do not refresh the page')

        const orderItem = {
            item : itemId,
            noOfItems : parseInt(selectedValues.quantity),
            subItem : selectedSubItem.id,
            unitPrice : selectedSubItem.price
        }

        return firestore
            .collection('Stores')
            .doc(storeId)
            .collection('Buyers')
            .doc(buyerId)
            .get()
        .then(dataSnapshot => {
            let cart = dataSnapshot.get('cart')
            return cart ? cart : []
        })
        .then(cart => {
            cart.push(orderItem)
            console.log(cart)
            return firestore
            .collection('Stores')
            .doc(storeId)
            .collection('Buyers')
            .doc(buyerId)
            .update({ 'cart' : cart})
        })
        .then(() => {
            toastr.success('Added to cart', 'Navigate to the cart tab to view your cart')
            reset()
        })
        .catch((error) => {
            toastr.error('Could not add item', error.message)
        })
    }

    return (
        <Fragment>
            <Form onSubmit={addToCart}>
                {
                    item && item.variants.map((variant, key) => {
                        const { title, attributes } = variant;
                        let options = [];
                        attributes.map(attribute => {
                            options.push({
                                key : attribute.attribute,
                                text : attribute.attribute,
                                value : attribute.attribute
                            })
                        });
                        return(
                            <Field
                                component={renderSelect}
                                label={title}
                                name={title}
                                options={options}
                                placeholder={title}
                                key={key}
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
                />

                <Container textAlign='center'>
                    <Form.Button 
                        primary 
                        disabled={
                            !buyerId || /* <-- give error messages indicating why add to cart is diabled */
                            isEmpty(selectedSubItem) ||        
                            selectedSubItem.stock === 0 || 
                            !selectedValues.quantity || 
                            (selectedValues.quantity > selectedSubItem.stock && selectedSubItem.stock != -1) 
                            }
                    >
                        Add To Cart
                    </Form.Button>
                </Container>
            </Form>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    selectedValues : get(state.form.addToCart, `values`),
    buyerId : get(state.firebase.auth, 'uid')
}) 

function withHooks(Component) {
    return function WrappedComponent(props) {
        const match = useRouteMatch();
        return <Component {...props} storeId={match.params.storeID}  />;
    }
}

export default compose(
    reduxForm({ form: "addToCart" }),
    withHooks,
    withFirestore,
    connect(mapStateToProps)
)
(AddToCartForm);
