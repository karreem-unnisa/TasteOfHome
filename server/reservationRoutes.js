const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST route to handle reservation form submission
router.post('/', (req, res) => {
  const reservation = req.body;

  // Read the existing reservations from the file
  fs.readFile(path.join(__dirname, 'reservations.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading reservations file' });

    let reservations = [];
    if (data) reservations = JSON.parse(data); // If file exists, parse existing reservations

    // Add new reservation to the list
    reservations.push(reservation);

    // Write updated reservations back to the file
    fs.writeFile(path.join(__dirname, 'reservations.json'), JSON.stringify(reservations, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Error saving reservation' });

      // Respond with success message
      res.status(201).json({ message: 'Reservation added successfully' });
    });
  });
});

module.exports = router;
