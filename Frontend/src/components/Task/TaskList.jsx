import React from 'react';
import styles from './Task.module.css';

const TaskList = ({ tasks, onUpdateStatus }) => {
    return (
        <div className={styles.taskContainer}>
            {tasks.map((task) => (
                <div className={styles.taskItem} key={task.id}>
                    <div>
                        <h3>{task.name}</h3>
                        <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        {task.assignedAttendee && (
                            <p><strong>Assigned To:</strong> {task.assignedAttendee}</p>
                        )}
                    </div>
                    <button
                        className={styles.statusButton}
                        onClick={() => onUpdateStatus(task.id)}
                    >
                        Mark as {task.status === 'Pending' ? 'Completed' : 'Pending'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
