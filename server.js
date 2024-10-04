const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const menuRoutes = require('./server/menuRoutes');
const reservationRoutes = require('./server/reservationRoutes');
const contactRoutes = require('./server/contactRoutes'); 
const reviewRoutes = require('./server/reviewRoutes'); // Import review routes

// Use the routes
app.use('/menu', menuRoutes);
app.use('/reservation', reservationRoutes);
app.use('/contact', contactRoutes);
app.use('/reviews', reviewRoutes); // Use review routes

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`); // Log request URL for debugging
  next();
});

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
