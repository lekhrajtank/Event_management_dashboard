import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Task.module.css';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', status: 'Pending', deadline: '', attendee: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks`);
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err.message);
                setError('Failed to load tasks.');
            }
        };

        fetchTasks();
    }, [API_URL]);

    // Add a new task
    const handleAdd = async () => {
        if (newTask.name && newTask.status && newTask.deadline && newTask.attendee) {
            try {
                const response = await axios.post(`${API_URL}/tasks`, newTask, {
                    headers: { 'Content-Type': 'application/json' },
                });
                setTasks([...tasks, response.data]);
                setNewTask({ name: '', status: 'Pending', deadline: '', attendee: '' });
                setSuccessMessage('Task added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (err) {
                console.error('Error adding task:', err.message);
                setError('Failed to add task.');
            }
        } else {
            setError('Please fill in all fields.');
        }
    };

    // Remove a task
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (err) {
            console.error('Error removing task:', err.message);
            setError('Failed to remove task.');
        }
    };

    // Update task status
    const handleStatusChange = async (id) => {
        const task = tasks.find((task) => task.id === id);
        if (task) {
            const updatedTask = { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' };
            try {
                const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
                    headers: { 'Content-Type': 'application/json' },
                });
                setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
            } catch (err) {
                console.error('Error updating task:', err.message);
                setError('Failed to update task.');
            }
        }
    };

    return (
        <div className={styles.taskPage}>
            <div className={styles.taskHeader}>
                <h1>Task Tracker</h1>
                <p>Manage tasks for your events and track progress.</p>
            </div>
            <div className={styles.taskForm}>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                />
                <input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
                <select
                    value={newTask.attendee}
                    onChange={(e) => setNewTask({ ...newTask, attendee: e.target.value })}
                >
                    <option value="">Select Attendee</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                </select>
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={handleAdd}>Add Task</button>
                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
            </div>
            <div className={styles.taskList}>
                {tasks.map((task) => (
                    <div className={styles.taskItem} key={task.id}>
                        <div>
                            <h3>{task.name}</h3>
                            <p>{task.deadline}</p>
                            <p>{task.attendee}</p>
                        </div>
                        <div>
                            <button
                                className={styles.taskStatus}
                                onClick={() => handleStatusChange(task.id)}
                            >
                                {task.status}
                            </button>
                            <button
                                className={styles.removeButton}
                                onClick={() => handleRemove(task.id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskPage;
