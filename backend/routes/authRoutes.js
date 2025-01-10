const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); // Ensure the path to your User model is correct
const { loginUser, registerUser } = require('../controllers/userController'); // Import both loginUser and registerUser functions

// Endpoint for fetching users from the database
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'email role'); // Fetch all users, selecting only email and role fields
    res.json(users); // Respond with the list of users as JSON
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});


// Register new user
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser); 



module.exports = router;
