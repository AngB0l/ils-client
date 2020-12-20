import React from 'react';
import {Form, Input} from 'formik-semantic-ui';
import axios from 'axios';
import FormikDatePicker from '../datepicker';
import moment from 'moment'
import {Container} from 'semantic-ui-react'


const AuthorForm = () => {

    return (
        <Container>
            <h1>Author</h1>
            <Form
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    dob: '',
                    about: '',
                }}
                onSubmit={async (values) => {
                  await axios.post('https://pamak-ils-api.herokuapp.com/authors', values)
                        .then(response => {
                            alert('Success :)')
                            window.location = "/authors"
                        })
                        .catch(error => {
                            alert('Something went wrong :s')
                        })
                }}
            >

                <label htmlFor="firstName">First Name</label>
                <Input name="firstName" placeholder="Jane"/>

                <label htmlFor="lastName">Last Name</label>
                <Input name="lastName" placeholder="Doe"/>

                <label htmlFor="email">Email</label>
                <Input name="email" placeholder="yourEmail@domain.com" type="email"/>

                <label htmlFor="dob">Date of Birth</label>
                <FormikDatePicker
                    name="dob"
                    inputProps={{
                        isOutsideRange: day => !moment(day).isSameOrBefore(moment()),
                        renderMonthElement: props => (
                            <FormikDatePicker.YearMonthSelector {...props} />
                        ),
                    }}
                />




                <label htmlFor="about">About</label>
                <Input name="about" as="textarea" placeholder="about"/>

                <button type="submit" >
                    Submit
                </button>

            </Form>
        </Container>
    );
}

export default AuthorForm;