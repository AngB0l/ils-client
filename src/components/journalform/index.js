import React, { useEffect, useState } from 'react';
import {Form, Input, Dropdown} from 'formik-semantic-ui';
import axios from 'axios';
import {Container} from 'semantic-ui-react'


const JournalForm = () => {
    const [publishers, setPublishers] = useState([]);
    
    const publishersToOptions = (items) => {
        return items.map((item) => {
            return {key: item._links.self.href, text: item.name, value: item._links.self.href}
        })
    }

    useEffect(() => {
        const fetchData = async () => {

            const publishersReponse = await axios('https://pamak-ils-api.herokuapp.com/publishers');

            const publishersData = publishersReponse.data._embedded.publishers

            setPublishers(publishersData);
        }

        fetchData()
    }, []);

    return (
        <Container>
            <h1>Journal</h1>
            <Form
                initialValues={{
                    title: '',
                    yearOfPublication: '',
                    pages: '',
                    copies: '',
                    refCode: '',
                    field: '',
                    volume: '',
                    issue: '',
                    isbn: '',
                    publisher: '',
                }}
                onSubmit={async (values) => {
                    await axios.post('https://pamak-ils-api.herokuapp.com/journals', values)
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

export default JournalForm;