import React from 'react';
import styles from './Event.module.css';

const EventList = ({ events, onDelete }) => {
    return (
        <div className={styles.eventContainer}>
            {events.map((event) => (
                <div className={styles.eventItem} key={event.id}>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <button onClick={() => onDelete(event.id)} className={styles.deleteButton}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EventList;
