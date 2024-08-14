const express = require('express')
const app = express.Router();
const notesControler = require('../Controler/notesControler')

app.get('/api/notes', notesControler.getAllNotes)
app.post('/api/notes', notesControler.postNotes)
app.get('/api/notes/:id', notesControler.getNotesById)
app.put('/api/notes/:id', notesControler.updateNotes)
app.delete('/api/notes/:id', notesControler.deletNotes)

module.exports = app;