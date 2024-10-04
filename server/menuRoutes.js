const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Route to get menu items
router.get('/', (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.json');
  fs.readFile(menuFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading menu file:', err);
      return res.status(500).json({ error: 'Error reading menu file' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
