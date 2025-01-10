import React, { useState } from 'react';
import styles from './Task.module.css';

const TaskForm = ({ onAdd, attendees }) => {
    const [taskData, setTaskData] = useState({
        name: '',
        deadline: '',
        assignedAttendee: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskData.name && taskData.deadline) {
            onAdd({ ...taskData, status: 'Pending' });
            setTaskData({ name: '', deadline: '', assignedAttendee: '' });
        }
    };

    return (
        <form className={styles.taskForm} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={taskData.name}
                onChange={handleChange}
                className={styles.inputField}
                required
            />
            <input
                type="date"
                name="deadline"
                value={taskData.deadline}
                onChange={handleChange}
                className={styles.inputField}
                required
            />
            <select
                name="assignedAttendee"
                value={taskData.assignedAttendee}
                onChange={handleChange}
                className={styles.inputField}
            >
                <option value="">Assign to Attendee</option>
                {attendees.map((attendee) => (
                    <option key={attendee.id} value={attendee.name}>
                        {attendee.name}
                    </option>
                ))}
            </select>
            <button type="submit" className={styles.addButton}>Add Task</button>
        </form>
    );
};

export default TaskForm;
