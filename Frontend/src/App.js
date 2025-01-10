import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AttendeesPage from './pages/AttendeesPage';
import EventsPage from './pages/EventsPage';
import TasksPage from './pages/TasksPage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated (using token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    setIsAuthenticated(!!token); // Set authentication state based on presence of token
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route - Login page */}
        <Route path="/login" element={<Login />} />

        {/* Redirect to the dashboard if authenticated, else show login page */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* Protected Routes (Only accessible if authenticated) */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/attendees" element={<AttendeesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
