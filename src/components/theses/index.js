import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Header,
    Table,
} from 'semantic-ui-react'
import _ from 'lodash';
import EditModal from "../editModal";
import {NavLink} from "react-router-dom";


const ThesesTable = () => {
    const [theses, setTheses] = useState([]);

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);

        return id;
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://pamak-ils-api.herokuapp.com/theses');
            const theses = result.data._embedded.theses;
            await Promise.all(theses.map(async (thesis) => {
                const authorResponse = await axios(thesis._links.author.href);
                // console.log(authorResponse)
                const authorFirstName = authorResponse.data.firstName;
                const authorLastName = authorResponse.data.lastName;
                const author =  authorFirstName + " " + authorLastName;
                thesis.author = author;
                thesis.authorUrl = authorResponse.data._links.self.href;

            }))

            setTheses(theses);
        }
        fetchData()
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`https://pamak-ils-api.herokuapp.com/theses/${id}`)
            .then(response => {
                alert('Success :)')
                window.location = "/theses"
            })
            .catch(error => {
                alert('Something went wrong :s')
            })
    }

    return (
        <div className="ThesesTable">
            <Container>
                <Header content={"Theses"} as="h2"/>
                <Button circular size='mini' positive icon='add' as={NavLink} to='/addthesis'/>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Supervising Professor</Table.HeaderCell>
                            <Table.HeaderCell>University</Table.HeaderCell>
                            <Table.HeaderCell>Department</Table.HeaderCell>
                            <Table.HeaderCell>Field</Table.HeaderCell>
                            <Table.HeaderCell>Year of Publication</Table.HeaderCell>
                            <Table.HeaderCell>Ref Code</Table.HeaderCell>
                            <Table.HeaderCell>Copies</Table.HeaderCell>
                            <Table.HeaderCell>Pages</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {theses.map(item => (
                            <Table.Row key={getIdFromUrl(item._links.thesis.href)}>
                                <Table.Cell> {getIdFromUrl(item._links.thesis.href)}</Table.Cell>
                                <Table.Cell> {item.title} </Table.Cell>
                                <Table.Cell> {item.type} </Table.Cell>
                                <Table.Cell> {item.author} </Table.Cell>
                                <Table.Cell> {item.supervisingProfessor} </Table.Cell>
                                <Table.Cell> {item.university} </Table.Cell>
                                <Table.Cell> {item.department} </Table.Cell>
                                <Table.Cell> {item.field} </Table.Cell>
                                <Table.Cell> {item.yearOfPublication} </Table.Cell>
                                <Table.Cell> {item.refCode} </Table.Cell>
                                <Table.Cell> {item.copies} </Table.Cell>
                                <Table.Cell> {item.pages} </Table.Cell>
                                <Table.Cell>
                                    <Button.Group icon>
                                        {/*pass the type as a prop to let the editModel know which <editform> to render*/}
                                        <EditModal item={item} type='thesis'></EditModal>
                                        <Button circular size='mini' icon='delete' onClick={()=> handleDelete(getIdFromUrl(item._links.thesis.href))}/>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Container>
        </div>
    );
}

export default ThesesTable;


