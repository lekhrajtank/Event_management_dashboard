import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.header}>
                <h1>Event Management Dashboard</h1>
                <p>Streamline your events, tasks, and attendees effortlessly!</p>
            </div>
            <div className={styles.linksContainer}>
                <Link to="/events" className={styles.linkCard}>
                    <div className={styles.iconContainer}>📅</div>
                    <h3>Event Management</h3>
                    <p>Create, edit, and manage your events with ease.</p>
                </Link>
                <Link to="/attendees" className={styles.linkCard}>
                    <div className={styles.iconContainer}>👥</div>
                    <h3>Attendee Management</h3>
                    <p>Manage attendees and assign tasks efficiently.</p>
                </Link>
                <Link to="/tasks" className={styles.linkCard}>
                    <div className={styles.iconContainer}>✅</div>
                    <h3>Task Tracker</h3>
                    <p>Track and update the progress of event tasks.</p>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
