const router = require("express").Router();
const { createNote } = require('../../lib/notes');
const notes = require("../../db/db.json");
var uniqid = require('uniqid'); 


router.get("/notes", (req, res) => {
    res.json(notes);
});

router.post("/notes", (req, res) => {
    // req.body.id = notes.length.toString();
    const noteId = uniqid().toString();
    console.log(noteId);
    req.body.id = noteId;
    const note = createNote(req.body, notes);
    res.json(note);
});

router.delete("/notes", (req, res) => {
    // TODO: Add delete route functionality here
});

module.exports = router;