const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Note');
const { response } = require('express');



// ROUTE : 1 Get all notes using GET Req "api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured!!!")
    }
})


// ROUTE : 2 Add a new notes Using POST "api/notes/addnotes"
router.post('/addnotes', fetchuser, [
    body('title', "Enter A Valid Title").isLength({ min: 3 }),
    body('description', "description must be atleast 5 chars >= 5").isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body

        // If Error Return bad Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()

        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured!!!")
    }
})


// ROUTE : 3 Update an exesisting note Using POST "api/notes/updatenotes". Login Required  
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create New Note Object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    //  Find the note to be updated and update it

    // const note = Notes.findByIdAndUpdate()
    let note = await Notes.findById(req.params.id)
    if (!note) return res.status(404).send("Not Found")

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, {new: true})
    res.json({note})

})



// ROUTE : 4 Delete an exesisting note Using DELETE "api/notes/deletenotes". Login Required  
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
   
    //  Find the note to be delete and delete it

    // const note = Notes.findByIdAndUpdate()
    let note = await Notes.findById(req.params.id)
    if (!note) return res.status(404).send("Not Found")


    // allow deletion if user.note = res.user.note.id  
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note: note})

})

module.exports = router 