import React, { useState } from 'react';
import styles from './Attendee.module.css';

const AttendeeForm = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({ name });
            setName('');
        }
    };

    return (
        <form className={styles.attendeeForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Attendee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.inputField}
            />
            <button type="submit" className={styles.addButton}>Add Attendee</button>
        </form>
    );
};

export default AttendeeForm;
