const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const reviewsFilePath = path.join(__dirname, 'reviews.json');

// Middleware to parse JSON data from requests
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// GET all reviews
router.get('/', (req, res) => {
  fs.readFile(reviewsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading reviews.' });
    }
    res.json(JSON.parse(data));
  });
});

// POST a new review
router.post('/', (req, res) => {
  const newReview = req.body;

  fs.readFile(reviewsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading reviews.' });
    }

    const reviews = JSON.parse(data);
    reviews.push(newReview);

    fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving review.' });
      }
      res.status(201).json(newReview);
    });
  });
});

module.exports = router;
