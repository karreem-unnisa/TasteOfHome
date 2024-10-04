const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const contactDataPath = path.join(__dirname, 'contact.json');

// POST route to handle form submissions
router.post('/submit', (req, res) => {
    const newSubmission = req.body;

    fs.readFile(contactDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        let contactEntries = [];
        if (data) {
            try {
                contactEntries = JSON.parse(data);
            } catch (parseError) {
                console.error(parseError);
                return res.status(500).json({ message: 'Error parsing JSON' });
            }
        }
        contactEntries.push(newSubmission);

        fs.writeFile(contactDataPath, JSON.stringify(contactEntries, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error writing to file' });
            }

            res.status(200).json({ message: 'Submission received!' });
        });
    });
});

module.exports = router;
