import React, { useEffect, useState } from 'react';
import { Form, Input, Dropdown, Checkbox } from 'formik-semantic-ui';
import axios from 'axios';
import { Container } from 'semantic-ui-react'
import _ from 'lodash'


const BookForm = () => {
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

    const publishersToOptions = (items) => {
        return items.map((item) => {
            return { key: item._links.self.href, text: item.name, value: item._links.self.href }
        })
    }

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);

        return id;
    }

    const authorsToOptions = (items) => {
        return items.map((item) => {
            return { key: item._links.self.href, text: item.firstName + item.lastName, value: item._links.self.href }
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

    return (
        <Container>
            <h1>Book</h1>
            <Form
                initialValues={{
                    copies: '',
                    title: '',
                    field: '',
                    pages: '',
                    refCode: '',
                    yearOfPublication: '',
                    isbn: '',
                    authors: '',
                    publisher: '',
                }}
                onSubmit={async (values) => {
                    //values.authorsCheckboxes contain the true/false state for each author
                    //we pick only the indexes of the authors that are true which means thay they are checked
                    let checkedAuthors = _.keys(_.pickBy(values.authorsCheckboxes, Boolean))

                    // authors is expected to be a list
                    values.authors = checkedAuthors.map(authorId => `https://pamak-ils-api.herokuapp.com/authors/${authorId}`)

                    
                    axios.post('https://pamak-ils-api.herokuapp.com/books', values)
                        .then(response => {
                            alert('Success :)')
                            window.location = "/books"
                        })
                        .catch(error => {
                            alert('Something went wrong :S \n' + error)
                        })
                }}
            >
                <label htmlFor="title">Title</label>
                <Input name="title" />

                <label htmlFor="yearOfPublication">Year of publication</label>
                <Input name="yearOfPublication" placeholder="yyyy" type="number" />

                <label htmlFor="field">Field</label>
                <Input name="field" />

                <label htmlFor="refCode">Ref Code</label>
                <Input name="refCode" />

                <label htmlFor="isbn">ISBN</label>
                <Input name="isbn" />

                <label htmlFor="publisher">Publisher</label>
                <Dropdown name="publisher" selection options={publishersToOptions(publishers)} />

                {/* <label htmlFor="authors">Authors</label>
                <Dropdown name="authors" fluid multiple selection options={authorsToOptions(authors)} /> */}

                <label htmlFor="authors">Select Authors</label>
                {authors.map((author, index) => (
                    <Checkbox
                        key={`authorsCheckboxes[${getIdFromUrl(author._links.self.href)}]`}
                        name={`authorsCheckboxes[${getIdFromUrl(author._links.self.href)}]`}
                        label={author.firstName + " " + author.lastName}
                    />
                ))}

                <label htmlFor="copies">Copies</label>
                <Input name="copies" type="number" />

                <label htmlFor="pages">Pages</label>
                <Input name="pages" type="number" />

                <button type="submit" >
                    Submit
                </button>
            </Form>
        </Container>
    );
}

export default BookForm;