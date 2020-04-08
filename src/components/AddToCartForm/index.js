import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Message } from "semantic-ui-react";
import { isLoaded, isEmpty } from 'react-redux-firebase'

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

function AddToCartForm({ item, subItems, children }) {
    const handleSubmit = (values) => {console.log('form submitted', values)}

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                {
                    item && item.variants.map((variant, key) => {
                        const { title, attributes } = variant;
                        let options = [];
                        attributes.map(attribute => {
                            options.push({
                                key : attribute,
                                text : attribute,
                                value : attribute
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
                <Form.Group inline>
                    <Form.Button primary>Add To Cart</Form.Button>
                </Form.Group>
            </Form>
        </Fragment>
    )
}

export default reduxForm({
    form: "addToCart"
  })(AddToCartForm);
