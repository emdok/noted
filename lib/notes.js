const fs = require("fs");
const path = require("path");
var uniqid = require("uniqid");

function createNote(body, notesArray) {
  const note = body;
  const noteId = uniqid().toString();
  note.id = noteId;

  notesArray.push(note);
  fs.writeFileSync( "./db/db.json",
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id !== id);
  return result;
}

module.exports = { createNote, findById };
