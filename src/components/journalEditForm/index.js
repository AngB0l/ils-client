import React from 'react';
import {Form, Input} from 'formik-semantic-ui';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import _ from "lodash";


const JournalEditForm = (props) => {

    const {item} = props;

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);
        return id;
    }

    return (
        <Container>
            <h1>Journal</h1>
            <Form
                initialValues={{
                    title: item.title,
                    yearOfPublication: item.yearOfPublication,
                    pages: item.pages,
                    copies: item.copies,
                    refCode: item.refCode,
                    field: item.field,
                    volume: item.volume,
                    issue: item.issue,
                    isbn: item.isbn,
                    //TODO : render the link to the publisher
                    publisher: item.publisher,
                }}
                onSubmit={async (values) => {
                    await axios.patch(`https://pamak-ils-api.herokuapp.com/journals/${getIdFromUrl(item._links.journal.href)}`, values)
                        .then(response => {
                            alert('Success :)')
                            // after a successful POST, show all
                            window.location = "/journals"
                        })
                        .catch(error => {
                            alert('Something went wrong :s')
                        })
                }}
            >

                <label htmlFor="title">Title</label>
                <Input name="title"/>

                <label htmlFor="issue">Issue</label>
                <Input name="issue" type="number"/>

                <label htmlFor="volume">Volume</label>
                <Input name="volume" type="number"/>

                <label htmlFor="yearOfPublication">Year of Publication</label>
                <Input name="yearOfPublication" type="number"/>

                <label htmlFor="field">Field</label>
                <Input name="field"/>

                <label htmlFor="refCode">Ref. Code</label>
                <Input name="refCode"/>

                <label htmlFor="isbn">ISBN</label>
                <Input name="isbn"/>

                <label htmlFor="publisher">Publisher</label>
                <Input name="publisher"/>

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

export default JournalEditForm;