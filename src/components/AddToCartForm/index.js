import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Container, Message, Divider } from "semantic-ui-react";
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { get } from 'lodash';
import { withFirestore } from 'react-redux-firebase'
import { useRouteMatch } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'

import { signInWithFb } from '../../actions/authActions'
import { addToCart } from './addToCart'
import { required, integer, positive } from './validators'

function AddToCartForm({ item, selectedSubItem, selectedValues, children, handleSubmit, errors, submitFailed, anyTouched, submitting, stockEnabled}) {
    
    //same variable is used in add to cart function as well
    let addToCartDisabled =  /* <-- give error messages indicating why add to cart is diabled */
        isEmpty(selectedSubItem) ||
        !selectedSubItem.stock ||
        selectedSubItem.stock === 0 ||
        (selectedValues.quantity > selectedSubItem.stock && stockEnabled)
    
    let warningList = [];
    if (isEmpty(selectedSubItem) || selectedSubItem.stock === null){
        warningList.push('An item matching the selected variants is not available')
    }
    else if (selectedSubItem.stock > -1){
        if(selectedSubItem.stock === 0){
            warningList.push('The item is out of stock')
        }
        else if(selectedValues.quantity > selectedSubItem.stock){
            warningList.push('Insufficient quantity of items in stock')
        }
    }
    console.log(warningList)

    const renderSelect = field => (
        <Form.Select
            label={field.label}
            name={field.input.name}
            onChange={(e, { value }) => field.input.onChange(value)}
            options={field.options}
            placeholder={field.placeholder}
            value={field.input.value}
            error={
                submitFailed && errors && errors[field.input.name]
                    ?
                    {
                        content: errors[field.input.name],
                        pointing: 'below',
                    }
                    :
                    null
            }
        />
    );

    return (
        <Fragment>
            <Divider/>
            <Form onSubmit={handleSubmit} warning={anyTouched && addToCartDisabled}>
                {
                    item && item.variants && item.variants.map((variant, key) => {
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
                    validate={[ required, integer, positive ]}
                    error={
                        submitFailed && errors && errors.quantity 
                        ?
                        {
                        content: errors.quantity,
                        pointing: 'below',
                        }
                        :
                        null
                    }
                />

                <Container textAlign='center'>
                    <Form.Button 
                        primary 
                        disabled={addToCartDisabled || submitting}
                    >
                        Add To Cart
                    </Form.Button>
                </Container>
                <Message
                    warning
                    header='Cannot Add Item To Cart!'
                    list={warningList}
                />
            </Form>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    selectedValues : get(state.form.addToCart, `values`),
    errors : get(state.form.addToCart, `syncErrors`),
    buyerId : get(state.firebase.auth, 'uid')
}) 

const mapDispatchToProps = (dispatch, { storeId, firestore }) => {
    return {
        signIn : () => dispatch(signInWithFb(storeId, firestore)),
    }
}

function withHooks(Component) {
    return function WrappedComponent(props) {
        const match = useRouteMatch();
        return <Component {...props} storeId={match.params.storeID}  />;
    }
}



export default compose(
    withHooks,
    withFirestore,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({ 
        form: "addToCart",
        onSubmit: addToCart,
    }),
)
(AddToCartForm);
