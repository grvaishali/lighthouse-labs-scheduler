import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
    InterviewerList.propTypes = {
        value: PropTypes.number,
        onChange: PropTypes.func.isRequired
    };

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {
                    props.interviewers.map((value, index) => {
                        return (
                            <InterviewerListItem
                                key={value.id}
                                name={value.name}
                                avatar={value.avatar}
                                selected={value.id === props.value}
                                onChange={e => props.onChange(value.id)}

                            />
                        )
                    })
                }
            </ul>
        </section>
    )
}