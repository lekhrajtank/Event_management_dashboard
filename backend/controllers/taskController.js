const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { name, deadline, attendee, event } = req.body;
        const task = new Task({ name, deadline, attendee, event });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get tasks for a specific event
const getTasksForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const tasks = await Task.find({ event: eventId }).populate('attendee');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getTasksForEvent, updateTaskStatus };
