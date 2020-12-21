// dependencies and data
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // to make a unique ID for each post

const dbPath = "../db/db.json";

router
  .route("/api/notes")
  // GET Requests
  .get((req, res) => {
    // Send db as json
    res.sendFile(path.join(__dirname, dbPath));
  })
  // POST Requests
  .post((req, res) => {
    // Add a unique identifier to request
    req.body.id = uuidv4();
    // Receive a note and save on the request body
    const newNote = req.body;
    //Get the note data
    fs.readFile(path.join(__dirname, dbPath), (err, data) => {
      if (err) throw err;
      const noteData = JSON.parse(data);
      noteData.push(newNote);
      fs.writeFile(
        path.join(__dirname, dbPath),
        JSON.stringify(noteData),
        (err) => {
          if (err) throw err;
          console.log(`The file was saved`);
        }
      );
      res.json(noteData);
    });
  });

// DELETE requests
router.delete("/api/notes/:id", (req, res) => {
  // Get the ID from the request body
  const deleteId = req.params.id;
  // Open the database
  fs.readFile(path.join(__dirname, dbPath), (err, data) => {
    if (err) throw err;
    // Parse the database data
    const noteData = JSON.parse(data);
    // Return all notes that don't have the deleteId
    const newNoteData = noteData.filter((note) => note.id != deleteId);
    // Write the new note data to the database
    fs.writeFile(
      path.join(__dirname, dbPath),
      JSON.stringify(newNoteData),
      (err) => {
        if (err) throw err;
        console.log(`The note was deleted`);
      }
    );
  });
  res.end();
});
module.exports = router;
