const Attendee = require('../models/attendeeModel');

// Add a new attendee
const addAttendee = async (req, res) => {
    try {
        const { name, email } = req.body;
        const attendee = new Attendee({ name, email });
        await attendee.save();
        res.status(201).json(attendee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all attendees
const getAllAttendees = async (req, res) => {
    try {
        const attendees = await Attendee.find();
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an attendee
const deleteAttendee = async (req, res) => {
    try {
        const { id } = req.params;
        await Attendee.findByIdAndDelete(id);
        res.status(200).json({ message: 'Attendee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addAttendee, getAllAttendees, deleteAttendee };
