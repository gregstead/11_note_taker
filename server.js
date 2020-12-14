// DEPENDENCIES

const express = require('express');
const path = require('path');
const fs = require('fs');

// Set up express app

const app = express();

// define a port to listen to incoming requests 
const PORT = process.env.PORT || 3000;

// set up Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Data 
// =====

const notes = [];

// Routes
// ======

// HTML routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// API routes
// * GET `/api/notes` - Reads the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', function (req, res) {
    // read the db.json file
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        // return all saved notes as JSON
        res.json(JSON.parse(data));
    })
});

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', function (req, res) { });

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', function (req, res) { });

// Start the server to being listening
app.listen(PORT, function () {
    console.log(`App is now listening on port: ${PORT}`);
});