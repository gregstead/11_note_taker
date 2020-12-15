// Dependencies
const express = require('express');

// Express app configurations
// =======
const app = express();

// define a port to listen to incoming requests 
const PORT = process.env.PORT || 3000;

// set up Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow client side access to public directory
app.use(express.static('public'));

// Routes
// ======

// HTML routes
const htmlRoutes = require('./routes/htmlRoutes');
app.use(htmlRoutes);

// API routes
const apiRoutes = require('./routes/apiRoutes');
app.use(apiRoutes);

// Start the server to being listening
app.listen(PORT, function () {
    console.log(`App is now listening on port: ${PORT}`);
});