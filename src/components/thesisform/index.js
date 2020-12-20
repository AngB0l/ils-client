import React, { useEffect, useState } from 'react';
import { Form, Input, Dropdown } from 'formik-semantic-ui';
import axios from 'axios';
import { Container } from 'semantic-ui-react'


const ThesisForm = () => {
    const [authors, setAuthors] = useState([]);

    const authorsToOptions = (items) => {
        return items.map((item) => {
            return { key: item._links.self.href, text: item.firstName + item.lastName, value: item._links.self.href }
        })
    }
    
    const thesisTypes = [{
        key: "Bachelor thesis",
        text: "Bachelor thesis",
        value: "Bachelor thesis",
    },
    {
        key: "Master thesis",
        text: "Master thesis",
        value: "Master thesis",
    }, {
        key: "PhD thesis",
        text: "PhD thesis",
        value: "PhD thesis",
    }]

    useEffect(() => {
        const fetchData = async () => {

            const authorsResponse = await axios('https://pamak-ils-api.herokuapp.com/authors');

            const authorsData = authorsResponse.data._embedded.authors

            setAuthors(authorsData)
        }

        fetchData()
    }, []);

    return (
        <Container>
            <h1>Thesis</h1>
            <Form
                initialValues={{
                    title: '',
                    yearOfPublication: '',
                    pages: '',
                    copies: '',
                    refCode: '',
                    field: '',
                    supervisingProfessor: '',
                    type: '',
                    department: '',
                    university: '',
                    author: '',
                }}
                onSubmit={async (values) => {
                    await axios.post('https://pamak-ils-api.herokuapp.com/theses', values)
                        .then(response => {
                            alert('Success :)')
                            window.location = "/theses"
                        })
                        .catch(error => {
                            alert('Something went wrong :S')
                        })
                }}
            >
                <label htmlFor="title">Title</label>
                <Input name="title" />

                <label htmlFor="type">Type</label>
                <Dropdown name="type" selection options={thesisTypes} />

                <label htmlFor="author">Author</label>
                <Dropdown name="author" selection options={authorsToOptions(authors)} />

                <label htmlFor="supervisingProfessor">Supervising Professor</label>
                <Input name="supervisingProfessor" />

                <label htmlFor="university">University</label>
                <Input name="university" />

                <label htmlFor="department">Department</label>
                <Input name="department" />

                <label htmlFor="field">Field</label>
                <Input name="field" />

                <label htmlFor="yearOfPublication">Year of publication</label>
                <Input name="yearOfPublication" placeholder="yyyy" type="number" />

                <label htmlFor="refCode">Ref. Core</label>
                <Input name="refCode" />

                <label htmlFor="copies">Copies</label>
                <Input name="copies" type="number" />

                <label htmlFor="pages">Pages</label>
                <Input name="pages" type="number" />


                <button type="submit">
                    Submit
                </button>
            </Form>
        </Container>
    );
}

export default ThesisForm;