import React from 'react';
import {Form, Input} from 'formik-semantic-ui';
import {Container} from 'semantic-ui-react'
import axios from 'axios';
import _ from "lodash";


const PublisherEditForm = (props) => {
    const {item} = props;

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);
        return id;
    }

    return (
        <Container>
            <h1>Publisher</h1>
            <Form
                initialValues={{
                    name: item.name,
                    street: item.street,
                    city: item.city,
                }}
                onSubmit={async (values) => {
                    await axios.patch(`https://pamak-ils-api.herokuapp.com/publishers/${getIdFromUrl(item._links.publisher.href)}`, values)
                        .then(response => {
                            alert('Success :)')
                            window.location = "/publishers"
                        })
                        .catch(error => {
                            alert('Something went wrong :S')
                        })
                }}
            >
                <label htmlFor="name">Name</label>
                <Input name="name"/>

                <label htmlFor="city">City</label>
                <Input name="city"/>

                <label htmlFor="street">Street</label>
                <Input name="street"/>

                <button type="submit">
                    Submit
                </button>
            </Form>
        </Container>
    );
}

export default PublisherEditForm;