const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { createNote, findById } = require("../../lib/notes");
let { notes } = require("../../db/db.json");

router.get("/notes", (req, res) => {
  if (!notes.length) {
    res.status(204).json("Notes not available");
  } else {
    res.json(notes);
  }
});

router.post("/notes", (req, res) => {
  const note = createNote(req.body, notes);
  res.json(note);
});

router.delete("/notes/:id", (req, res) => {
  console.log("delete route called");
  notes = findById(req.params.id, notes);

  console.log(notes);

  fs.writeFileSync("./db/db.json",
    JSON.stringify({ notes }, null, 2)
  );

  res.json(notes);

});

module.exports = router;

/*DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.*/
