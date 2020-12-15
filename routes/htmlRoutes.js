
// DEPENDENCIES
var path = require('path');
var router = require('express').Router();

// ROUTING

// HTML GET Requests

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// // If no matching route is found default to home
// router.get('*', (_req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

module.exports = router;
