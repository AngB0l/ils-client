import React, { useEffect, useState } from 'react';
import {Form, Input, Dropdown} from 'formik-semantic-ui';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import _ from "lodash";


const BookEditForm = (props) => {

    const {item} = props;

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);
        return id;
    }

    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    
    const publishersToOptions = (items) => {
        return items.map((item) => {
            return {key: item._links.self.href, text: item.name, value: item._links.self.href}
        })
    }

    const authorsToOptions = (items) => {
        return items.map((item) => {
            return {key: item._links.self.href, text: item.firstName + item.lastName , value: item._links.self.href}
        })
    }

    useEffect(() => {
        const fetchData = async () => {

            const authorsResponse = await axios('https://pamak-ils-api.herokuapp.com/authors');
            const publishersReponse = await axios('https://pamak-ils-api.herokuapp.com/publishers');

            const authorsData = authorsResponse.data._embedded.authors
            const publishersData = publishersReponse.data._embedded.publishers

            setAuthors(authorsData)
            setPublishers(publishersData);
    
        }

        fetchData()
    }, []);
console.log(item)
    return (
        <Container>
            <h1>Book</h1>
            <Form
                initialValues={{
                    copies: item.copies,
                    title: item.title,
                    field: item.field,
                    pages: item.pages,
                    refCode: item.refCode,
                    yearOfPublication: item.yearOfPublication,
                    isbn: item.isbn,
                    authors: item.authorsUrl,
                    publisher: item.publisherUrl,
                }}
                onSubmit={async (values) => {
                    // authors is expected to be a list
                    values.authors = values.authors.split(',')
                   await axios.patch(`https://pamak-ils-api.herokuapp.com/books/${getIdFromUrl(item._links.book.href)}`, values)
                        .then(response => {
                            alert('Success :)')
                            window.location = "/books"
                        })
                        .catch(error => {
                            alert('Something went wrong :s \n' + error)
                        })
                }}
            >
                <label htmlFor="title">Title</label>
                <Input name="title"/>

                <label htmlFor="authors">Authors</label>
                <Input name="authors"/>

                <label htmlFor="yearOfPublication">Year of publication</label>
                <Input name="yearOfPublication" placeholder="yyyy" type="number"/>

                <label htmlFor="field">Field</label>
                <Input name="field"/>

                <label htmlFor="refCode">Ref Code</label>
                <Input name="refCode"/>

                <label htmlFor="isbn">ISBN</label>
                <Input name="isbn"/>

                <label htmlFor="publisher">Publisher</label>
                <Dropdown name="publisher" selection options={publishersToOptions(publishers)} />

                <label htmlFor="copies">Copies</label>
                <Input name="copies" type="number"/>

                <label htmlFor="pages">Pages</label>
                <Input name="pages" type="number"/>

                <button type="submit">
                    Submit
                </button>
            </Form>
        </Container>
    );
}

export default BookEditForm;