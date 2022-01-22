const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const { createNote, findById } = require('../../lib/notes');
const { notes } = require("../../db/db.json");
var uniqid = require('uniqid'); 


router.get("/notes", (req, res) => {
    res.json(notes);
});

router.post("/notes", (req, res) => {
    const noteId = uniqid().toString();
    req.body.id = noteId;

    const note = createNote(req.body, notes);
    res.json(note);
});

router.delete("/notes/:id", (req, res) => {
    console.log("delete route called")
    const noteToRemove = findById(req.params.id, notes);

    const result = notes.filter(note => note !== noteToRemove)
    
    console.log(result);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: result }, null, 2)
    );
});

module.exports = router;

/*DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.*/