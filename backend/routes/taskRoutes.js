// taskRoutes.js
const express = require('express');
const { createTask, getTasksForEvent, updateTaskStatus } = require('../controllers/taskController');
const router = express.Router();

router.post('/api/tasks', createTask);
router.get('/api/tasks/:eventId', getTasksForEvent);
router.put('/api/tasks/:taskId', updateTaskStatus);

module.exports = router;
