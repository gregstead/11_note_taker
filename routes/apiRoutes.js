// dependencies and data
const router = require('express').Router();
const fs = require('fs');
const noteData = require('../db/db.json'); //Cache note data as JSON
const { v4: uuidv4 } = require('uuid'); // to make a unique ID for each post

router
    .route('/api/notes')
    // GET Requests
    .get((req, res) => {
        res.json(noteData)
        console.log(`API GET: Success`);
    })
    // POST Requests
    .post((req, res) => {
        // Add a unique identifier to request
        req.body.id = uuidv4();
        // Receive a note and save on the request body
        const newNote = req.body;
        // Add it to the db.json file
        noteData.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteData), (err) => {
            if (err) throw err;
            console.log(`API POST: Sucess`);
        });
        // Return the new note to the client
        res.json(noteData);
    });

// DELETE requests
router
    .route('/api/notes/:id')
    .delete((req, res) => {
        //Record to be deleted
        const deleteID = req.params.id;
        console.log(`${JSON.stringify(req.body)}`);
    })

module.exports = router;
