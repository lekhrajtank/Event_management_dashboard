// eventRoutes.js
const express = require('express');
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

router.post('/api/events', createEvent);
router.get('/api/events', getAllEvents);
router.put('/api/events/:id', updateEvent);
router.delete('/api/events/:id', deleteEvent);

module.exports = router;
