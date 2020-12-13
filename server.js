// DEPENDENCIES

const express = require('express');
const path = require('path');

// Set up express app

const app = express();

// define a port to listen to incoming requests 
const PORT = process.env.PORT || 3000;

// set up Express app to handle data parsing
app.use(express.json());

// Data 
// =====

const notes = [];

// Routes
// ======

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'))
});

