const express = require("express");
const path = require("path");
const fs = require("fs");
//set up express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
// send the user to the correct html using routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});
app.get("/api/notes", function (req, res) {
  res.sendfile(path.join(__dirname, "/db/db.json"))
});
app.post("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (err, data) {
    if (err) {
      console.log(err)
    }
    const oldNotes = JSON.parse(data);
    const newNote = req.body;
    const noteID = oldNotes.length + 1;
    const noteObj = {
      id: noteID, title: newNote.title, text: newNote.text
    };
    console.log(data);
    oldNotes.push(noteObj);
    res.json(noteObj);
    console.log(noteObj);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(oldNotes, null, 2), function (err) {
      if (err) {
        return console.log(err)
      }
    });
  });
});
app.delete("/api/notes/:id", function (req, res) {
  const dNoteID = req.params.id;
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function (err, data) {
    if (err) {
      console.log(err)
    }
    let oNotes = JSON.parse(data);
    console.log(data);
    res.json(oNotes.splice(dNoteID - 1, 1));
    for (let i = 0; i < oNotes.length; i++) {
      oNotes[i].id = i + 1;
    }
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(oNotes, null, 2), function (err) {
      if (err) {
        return console.log(err)
      }
    });
  });
});
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});