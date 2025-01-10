const express = require('express');
const authenticate = require('../middlewares/authMiddleware'); // Middleware to protect routes
const router = express.Router();

// Example of a protected route
router.get('/api/profile', authenticate, (req, res) => {
  res.json({ message: 'This is a protected profile route' });
});

module.exports = router;
