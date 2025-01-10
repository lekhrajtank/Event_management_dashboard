import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Attendee.module.css';

const AttendeePage = () => {
    const [attendees, setAttendees] = useState([]);
    const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch attendees from the backend
    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const response = await axios.get(`${API_URL}/attendees`);
                setAttendees(response.data);
            } catch (err) {
                console.error('Error fetching attendees:', err.message);
                setError('Failed to load attendees.');
            }
        };

        fetchAttendees();
    }, [API_URL]);

    // Add a new attendee
    const handleAdd = async () => {
        if (newAttendee.name && newAttendee.email) {
            try {
                const response = await axios.post(`${API_URL}/attendees`, newAttendee, {
                    headers: { 'Content-Type': 'application/json' },
                });
                setAttendees([...attendees, response.data]);
                setNewAttendee({ name: '', email: '' });
                setSuccessMessage('Attendee added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (err) {
                console.error('Error adding attendee:', err.message);
                setError('Failed to add attendee.');
            }
        } else {
            setError('Please fill in all fields.');
        }
    };

    // Remove an attendee
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${API_URL}/attendees/${id}`);
            setAttendees(attendees.filter((attendee) => attendee.id !== id));
        } catch (err) {
            console.error('Error removing attendee:', err.message);
            setError('Failed to remove attendee.');
        }
    };

    return (
        <div className={styles.attendeePage}>
            <div className={styles.attendeeHeader}>
                <h1>Attendee Management</h1>
                <p>Add, view, and manage your attendees effortlessly.</p>
            </div>
            <div className={styles.attendeeForm}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newAttendee.name}
                    onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newAttendee.email}
                    onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                />
                <button onClick={handleAdd}>Add Attendee</button>
                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </div>
            <div className={styles.attendeeList}>
                {attendees.map((attendee) => (
                    <div className={styles.attendeeItem} key={attendee.id}>
                        <div>
                            <h3>{attendee.name}</h3>
                            <p>{attendee.email}</p>
                        </div>
                        <button
                            className={styles.removeButton}
                            onClick={() => handleRemove(attendee.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttendeePage;
