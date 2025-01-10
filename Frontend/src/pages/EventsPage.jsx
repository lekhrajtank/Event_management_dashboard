import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Event.module.css';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch existing events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('authToken');  // Get token from localStorage

                // Check if token exists
                if (!token) {
                    throw new Error('Authentication token is missing');
                }

                // Fetch events with token in Authorization header
                const response = await axios.get(`${API_URL}/events`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setEvents(response.data);
            } catch (err) {
                console.error('Error fetching events:', err.message);
                setError('Failed to fetch events. Please check your authentication.');
            }
        };

        fetchEvents();
    }, [API_URL]);

    // Handle adding a new event
    const handleAdd = async () => {
        if (newEvent.name && newEvent.description && newEvent.date) {
            try {
                const token = localStorage.getItem('authToken');  // Get token from localStorage

                // Check if token exists
                if (!token) {
                    throw new Error('Authentication token is missing');
                }

                const response = await axios.post(`${API_URL}/events`, newEvent, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Add token in Authorization header
                    },
                });
                setEvents([...events, response.data]); // Add the new event to the list
                setNewEvent({ name: '', description: '', date: '' }); // Reset form
                setError('');
                setSuccessMessage('Event added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
            } catch (err) {
                console.error('Error adding event:', err.message);
                setError('Failed to add event. Please try again.');
            }
        } else {
            setError('Please fill in all fields before adding an event.');
        }
    };

    // Handle removing an event
    const handleRemove = async (id) => {
        try {
            const token = localStorage.getItem('authToken');  // Get token from localStorage

            // Check if token exists
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            await axios.delete(`${API_URL}/events/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Add token in Authorization header
                },
            });
            setEvents(events.filter((event) => event.id !== id)); // Remove the event from the list
        } catch (err) {
            console.error('Error deleting event:', err.message);
            setError('Failed to remove event. Please try again.');
        }
    };

    return (
        <div className={styles.eventPage}>
            <header className={styles.eventHeader}>
                <h1>Event Management</h1>
                <p>Add, view, and manage your events effortlessly.</p>
            </header>

            <section className={styles.eventForm}>
                <h2>Add New Event</h2>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    required
                />
                <button onClick={handleAdd} className={styles.addButton}>
                    Add Event
                </button>
                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </section>

            <section className={styles.eventList}>
                <h2>Upcoming Events</h2>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div className={styles.eventItem} key={event.id}>
                            <div>
                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                                <p>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                            <button
                                className={styles.removeButton}
                                onClick={() => handleRemove(event.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className={styles.noEvents}>No events available. Add your first event!</p>
                )}
            </section>
        </div>
    );
};

export default EventPage;
