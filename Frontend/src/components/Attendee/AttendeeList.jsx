import React from 'react';
import styles from './Attendee.module.css';

const AttendeeList = ({ attendees, onDelete }) => {
    return (
        <div className={styles.attendeeContainer}>
            {attendees.map((attendee) => (
                <div className={styles.attendeeItem} key={attendee.id}>
                    <span>{attendee.name}</span>
                    <button onClick={() => onDelete(attendee.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default AttendeeList;
