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


const PublishersTable = () => {
    const [publishers, setPublishers] = useState([]);

    const getIdFromUrl = (url) => {
        const ar = url.split('/');
        const id = _.last(ar);

        return id;
    }

    useEffect(() => {
            const fetchData = async () => {
                const result = await axios('https://pamak-ils-api.herokuapp.com/publishers');
                const publishers = result.data._embedded.publishers;
                setPublishers(publishers);

            }
            fetchData()

        },
        []);

    const handleDelete = async (id) => {
        await axios.delete(`https://pamak-ils-api.herokuapp.com/publishers/${id}`)
            .then(response => {
                alert('Success :)')
                window.location = "/publishers"
            })
            .catch(error => {
                alert('Something went wrong :s')
            })
    }

    return (
        <div className="PublishersTable">
            <Container>
                <Header content={"Publishers"} as="h2"/>
                <Button circular size='mini' positive icon='add' as={NavLink} to='/addpublisher'/>

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Street</Table.HeaderCell>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {publishers.map(item => (
                            <Table.Row key={getIdFromUrl(item._links.publisher.href)}>
                                <Table.Cell> {getIdFromUrl(item._links.publisher.href)}</Table.Cell>
                                <Table.Cell> {item.name} </Table.Cell>
                                <Table.Cell> {item.street} </Table.Cell>
                                <Table.Cell> {item.city} </Table.Cell>
                                <Table.Cell>
                                    <Button.Group icon>
                                        {/*pass the type as a prop to let the editModel know which <editform> to render*/}
                                        <EditModal item={item} type='publisher'></EditModal>
                                        <Button circular size='mini' icon='delete'
                                                onClick={() => handleDelete(getIdFromUrl(item._links.publisher.href))}/>
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

export default PublishersTable;


