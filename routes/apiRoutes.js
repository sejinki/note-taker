const app = require("express").Router();
let db = require("../db/db.json")
const fs = require("fs")


app.get("/api/notes", function (req, res) {
    db = JSON.parse(fs.readFileSync("./db/db.json")) || []
    res.json(db)
});


app.post("/api/notes", function (req, res) {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 9451)
    }
    db.push(newNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err
    })
    res.json(db)
});


app.delete("/api/notes/:id", function (req, res) {
    let notDeletedNote = []
    db.forEach(element => {
        if (element.id != req.params.id) {
            notDeletedNote.push(element)
        }
    })
    db = notDeletedNote
    fs.writeFileSync("./db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err
    })
    res.json(db)
});

app.get("/api/notes/:id", function (req, res) {
    let notDeletedNote
    db.forEach(element => {
        if (element.id == req.params.id) {
            notDeletedNote = element
        }
    })
    res.json(notDeletedNote)
});

module.exports = app;