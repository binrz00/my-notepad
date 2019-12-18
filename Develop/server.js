const express = require("express");
const path = require("path");
const fs = require("fs");

//set up express
const app = express();
const PORT = process.env.PORT||3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
// send the user to the correct html using routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});
app.get("/api/notes",function(req,res){
  res.sendfile(path.join(__dirname, "/db/db.json"))
});
app.post("api/notes",function(req,res){
  req.body.sendfile(paht.join(__dirname, "db/db.json"))
});
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });