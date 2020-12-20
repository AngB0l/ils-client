import React from 'react';
import {Form, Input} from 'formik-semantic-ui';
import axios from 'axios';
import FormikDatePicker from '../datepicker';
import moment from 'moment'
import {Container} from 'semantic-ui-react'
import _ from "lodash";


const AuthorEditForm = (props) => {

    const {item} = props;

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);
        return id;
    }

    return (
        <Container>
            <h1>Author</h1>
            <Form
                initialValues={{
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    dob: item.dob,
                    about: item.about,
                }}
                onSubmit={async (values) => {
                    await  axios.patch(`https://pamak-ils-api.herokuapp.com/authors/${getIdFromUrl(item._links.author.href)}`, values)
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

                <button type="submit">
                    Submit
                </button>

            </Form>
        </Container>
    );
}

export default AuthorEditForm;