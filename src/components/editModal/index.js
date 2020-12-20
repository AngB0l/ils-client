import React from 'react'
import {Button, Modal} from 'semantic-ui-react'
import AuthorEditForm from '../authorEditForm'
import PublisherEditForm from "../publisherEditForm";
import ThesisEditForm from "../thesisEditForm";
import JournalEditForm from "../journalEditForm";
import BookEditForm from "../bookEditForm";

function EditModal(props) {
    const [open, setOpen] = React.useState(false)

    const {item, type} = props

    return (

        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button circular size='mini' icon='edit'/>
            }
        >
            <Modal.Content>
                <p>
                    {
                        {
                            'author': <AuthorEditForm item={item}></AuthorEditForm>,
                            'publisher': <PublisherEditForm item={item}></PublisherEditForm>,
                            'thesis': <ThesisEditForm item={item}></ThesisEditForm>,
                            'journal': <JournalEditForm item={item}></JournalEditForm>,
                            'book': <BookEditForm item={item}></BookEditForm>,

                        }[type]
                    }
                </p>
            </Modal.Content>
        </Modal>
    )
}

export default EditModal
