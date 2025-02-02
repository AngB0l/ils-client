import React, { useEffect, useState } from 'react';
import {Form, Input, Dropdown} from 'formik-semantic-ui';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import _ from "lodash";


const ThesisEditForm = (props) => {

    const {item} = props;

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);
        return id;
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
    
    const [authors, setAuthors] = useState([]);
    
    const authorsToOptions = (items) => {
        return items.map((item) => {
            return {key: item._links.self.href, text: item.firstName + item.lastName , value: item._links.self.href}
        })
    }

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
                    title: item.title,
                    yearOfPublication: item.yearOfPublication,
                    pages: item.pages,
                    copies: item.copies,
                    refCode: item.refCode,
                    field: item.field,
                    supervisingProfessor: item.supervisingProfessor,
                    type: item.type,
                    department: item.department,
                    university: item.university,
                    author: item.authorUrl,
                }}
                onSubmit={async (values) => {
                    await axios.patch(`https://pamak-ils-api.herokuapp.com/theses/${getIdFromUrl(item._links.thesis.href)}`, values)
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
                <Input name="title"/>

                <label htmlFor="type">Type</label>
                <Dropdown name="type" selection options={thesisTypes} />

                <label htmlFor="author">Author</label>
                <Dropdown name="author" selection options={authorsToOptions(authors)} />

                <label htmlFor="supervisingProfessor">Supervising Professor</label>
                <Input name="supervisingProfessor"/>

                <label htmlFor="university">University</label>
                <Input name="university"/>

                <label htmlFor="department">Department</label>
                <Input name="department"/>

                <label htmlFor="field">Field</label>
                <Input name="field"/>

                <label htmlFor="yearOfPublication">Year of publication</label>
                <Input name="yearOfPublication" placeholder="yyyy" type="number"/>

                <label htmlFor="refCode">Ref. Core</label>
                <Input name="refCode"/>

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

export default ThesisEditForm;