import React, {useEffect, useState} from 'react'
import {Card, Icon, Image, Grid, Container} from 'semantic-ui-react'
import book from './book.jpg'
import author from './author.jpg'
import publisher from './publisher.jpg'
import {NavLink} from "react-router-dom";
import axios from "axios";
import _ from 'lodash';

const CardContentBlock = () => {
    const [authorsCount, SetAuthorsCount] = useState([]);
    const [publishersCount, SetPublishersCount] = useState([]);
    const [booksCount, SetBooksCount] = useState([]);
    const [thesisCount, SetThesisCount] = useState([]);
    const [journalsCount, SetJournalsCount] = useState([]);
    useEffect(() => {
        const fetchAuthors = async () => {
            const result = await axios('https://pamak-ils-api.herokuapp.com/authors');
            const count = result.data._embedded.authors.length;
            SetAuthorsCount(count);
        }
        const fetchPublishers = async () => {
            const result = await axios('https://pamak-ils-api.herokuapp.com/publishers');
            const count = result.data._embedded.publishers.length;
            SetPublishersCount(count);
        }
        const fetchBooks = async () => {
            const result = await axios('https://pamak-ils-api.herokuapp.com/books');
            const count = result.data._embedded.books.length;
            SetBooksCount(count);
        }
        const fetchthesis = async () => {
            const result = await axios('https://pamak-ils-api.herokuapp.com/theses');
            const count = result.data._embedded.theses.length;
            SetThesisCount(count);
        }
        const fetchjournal = async () => {
            const result = await axios('https://pamak-ils-api.herokuapp.com/journals');
            const count = result.data._embedded.journals.length;
            SetJournalsCount(count);
        }


        fetchAuthors()
        fetchPublishers()
        fetchBooks()
        fetchthesis()
        fetchjournal()

    }, []);
    return (
        <Container>
            <Grid stackable columns={3}>
                <Grid.Column>
                    <Card>
                        <Image src={book} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>Publications</Card.Header>
                            <Card.Description>
                                {booksCount} Books, {journalsCount} Journals and {thesisCount} Theses!
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <Icon name='add' color='green'/>
                            Add a new
                            <NavLink to='/addbook'> Book </NavLink>
                            ,a
                            <NavLink to='/addjournal'> Journal </NavLink>
                            or a
                            <NavLink to='/addthesis'> Thesis </NavLink>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column>
                    <Card>
                        <Image src={author} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>Authors</Card.Header>
                            <Card.Description>
                                {authorsCount} Authors!
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <Icon name='add' color='green'/>
                            Add a new
                            <NavLink as={NavLink} to='/addauthor'> Author </NavLink>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column>
                    <Card>
                        <Image src={publisher} wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>Publishers</Card.Header>
                            <Card.Description>
                                {publishersCount} Publishers!
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <Icon name='add' color='green'/>
                            Add a new
                            <NavLink to='/addpublisher'> Publisher </NavLink>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>

        </Container>
    );
}

export default CardContentBlock
