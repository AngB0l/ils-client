import React from 'react';
import {Form, Input} from 'formik-semantic-ui';
import {Container} from 'semantic-ui-react'
import axios from 'axios';


const PublisherForm = () => {


    return (
        <Container>
            <h1>Publisher</h1>
            <Form
                initialValues={{
                    name: '',
                    street: '',
                    city: '',
                }}
                onSubmit={async (values) => {
                    await axios.post('https://pamak-ils-api.herokuapp.com/publishers', values)
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

export default PublisherForm;