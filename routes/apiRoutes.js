// dependencies and data
const router = require('express').Router();
const fs = require('fs');
const noteData = require('../db/db.json');

router
    .route('/api/notes')
    // GET Requests
    .get((_req, res) => {
        res.json(noteData)
    })
    // POST Requests
    .post((req, res) => {
        // Receive a note and save on the request body
        const newNote = req.body;
        // Add it to the db.json file
        noteData.push(newNote);
        fs.writeFileSync('./db/db.json', noteData, function (err) {
            if (err) throw err;
            console.log(`${req.body} written to db`);
        });
        // Return the new note to the client
        res.json(noteData);
    })
    // DELETE requests
    .delete('/api/notes/:id', (req, res) => {

    })
module.exports = router;
