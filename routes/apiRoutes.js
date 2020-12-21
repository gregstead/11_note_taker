// dependencies and data
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // to make a unique ID for each post

// // Cache note data
// const notesFile = path.join(__dirname, "../db/db.json");

router
  .route("/api/notes")
  // GET Requests
  .get((req, res) => {
    // Send db as json
    res.sendFile(path.join(__dirname, "../db/db.json"));
  })
  // POST Requests
  .post((req, res) => {
    // Add a unique identifier to request
    req.body.id = uuidv4();
    // Receive a note and save on the request body
    const newNote = req.body;
    //Get the note data
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      const noteData = JSON.parse(data);
      noteData.push(newNote);
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
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
// router.route("/api/notes/:id").delete(async (req, res) => {
//   //Cache note data
//   const noteData = await fs.readFile(notesFile, (err, data) => {
//     if (err) throw err;
//     return data;
//   });
//   //Record to be deleted
//   const deleteId = req.params.id;
//   // Remove post with matching record ID
//   const newNoteData = {};
//   // Write changes to db
//   fs.writeFile(notesFile, JSON.stringify(newNoteData), (err) => {
//     if (err) throw err;
//   });
//   console.log(`The file has been deleted`);
//   res.end();
// });

module.exports = router;
