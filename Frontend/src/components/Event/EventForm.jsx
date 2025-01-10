import React, { useState } from 'react';
import styles from './Event.module.css';

const EventForm = ({ onAdd }) => {
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        location: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventData.name && eventData.description && eventData.location && eventData.date) {
            onAdd(eventData);
            setEventData({ name: '', description: '', location: '', date: '' });
        }
    };

    return (
        <form className={styles.eventForm} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={eventData.name}
                onChange={handleChange}
                className={styles.inputField}
                required
            />
            <textarea
                name="description"
                placeholder="Event Description"
                value={eventData.description}
                onChange={handleChange}
                className={styles.inputField}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={eventData.location}
                onChange={handleChange}
                className={styles.inputField}
                required
            />
            <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className={styles.inputField}
                required
            />
            <button type="submit" className={styles.addButton}>Add Event</button>
        </form>
    );
};

export default EventForm;
