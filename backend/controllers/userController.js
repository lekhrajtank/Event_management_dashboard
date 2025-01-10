require('dotenv').config();  // This line should be at the top of your userController.js fil
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');  // Assuming your User model is located here

// Your login logic here
const loginUser = (req, res) => {
  const { email, password } = req.body;
  // Check if user exists and password is correct (this part is simplified for demonstration)
  const user = {}; // You should query your database to find the user
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};


// Register new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Create a new user with the plain password (no hashing)
  const newUser = new User({ email, password });
  await newUser.save();
  res.status(201).send({ message: 'User registered successfully!' });
};


module.exports = { loginUser , registerUser };
