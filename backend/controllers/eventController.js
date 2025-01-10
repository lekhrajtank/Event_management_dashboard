const Event = require('../models/eventModel');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { name, description, location, date } = req.body;
        const event = new Event({ name, description, location, date });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('attendees');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, location, date } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(id, { name, description, location, date }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };
