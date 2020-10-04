import React from 'react'
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import useVisualMode from '../../hooks/useVisualMode';

export default function Appointment(props) {

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";

    const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

    const save = (name, interviewer) => {

        transition(SAVING);

        const interview = {
            student: name,
            interviewer
        };

        props.bookInterview(props.id, interview)
            .then(() => {
                transition(SHOW);
            })

    }

    const cancel = () => transition(CONFIRM);

    const confirmDelete = () => {

        transition(DELETING);

        props.cancelInterview(props.id)
            .then(() => {
                transition(EMPTY)
            });
    }

    const cancelDelete = () => {
        back();
    }

    return (<article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === SHOW && (
            <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onDelete={cancel}
            />
        )}

        {mode === CREATE && (
            <Form
                onCancel={cancel}
                interviewers={props.interviewers}
                onSave={save} />

        )}

        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}

        {mode === CONFIRM && (
            <Confirm
                message="Are you sure you would like to delete?"
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />
        )}
    </article>)
};