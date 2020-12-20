// dependencies and data
const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // to make a unique ID for each post

router
    .route('/api/notes')
    // GET Requests
    .get((req, res) => {
        const noteData = require('../db/db.json'); //Cache note data as JSON
        res.json(noteData)
    })
    // POST Requests
    .post((req, res) => {
        //Cache note data as JSON
        const noteData = require('../db/db.json');
        // Add a unique identifier to request
        req.body.id = uuidv4();
        // Receive a note and save on the request body
        const newNote = req.body;
        // Add it to the db.json file
        noteData.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteData), (err) => {
            if (err) throw err;
        });
        // Return the new note to the client
        res.end();
    });

// DELETE requests
router
    .route('/api/notes/:id')
    .delete((req, res) => {
        //Cache note data as JSON
        const noteData = require('../db/db.json');
        //Record to be deleted
        const deleteId = req.params.id;
        // Remove post with matching record ID
        const newNoteData = noteData.filter((note) => note.id !== deleteId);
        // Write changes to db
        fs.writeFile('./db/db.json', JSON.stringify(newNoteData), (err) => {
            if (err) throw err;
        });
        res.end();
    })

module.exports = router;
