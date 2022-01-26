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

    if (req.body.title.length > 0 && req.body.text.length > 0) {
        const note = createNote(req.body, notes);
        res.json(note);
    } else {
        res.status(204).json("Response does not contain body")
    }

});

router.delete("/notes/:id", (req, res) => {
    if (req.params.id.length > 0) {

        notes = findById(req.params.id, notes);
      
        console.log(notes);
      
        fs.writeFileSync("./db/db.json",
          JSON.stringify({ notes }, null, 2)
        );
      
        res.json(notes);
    } else {
        res.status(204).json("Response does not contain body")
    }
});

module.exports = router;