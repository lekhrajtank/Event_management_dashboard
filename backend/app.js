const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoute = require('./routes/authRoutes');
const authenticate = require('./middlewares/authMiddleware'); 
const errorHandler = require('./middlewares/errorMiddleware'); 
const userController = require('./controllers/userController'); 

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB(); // Establish the database connection

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); 

app.use('/api', authRoute);
app.use('/api/events', authenticate, eventRoutes); 
app.use('/api/attendees', authenticate, attendeeRoutes); 
app.use('/api/tasks', authenticate, taskRoutes); 

app.post('/api/login', userController.loginUser); 

app.use(errorHandler); 

module.exports = app;
