const express = require('express');
const { addAttendee, getAllAttendees, deleteAttendee } = require('../controllers/attendeeController');
const router = express.Router();

router.post('/api/attendees', addAttendee);
router.get('/api/attendees', getAllAttendees);
router.delete('/api/attendees/:id', deleteAttendee);

module.exports = router;
