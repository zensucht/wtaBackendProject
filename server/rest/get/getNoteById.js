const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// When given an id, return the note associated with that id.
// Populates the asset associated with the note.
getNoteById = (req,res) => {
    let { _id }         = req.params;
    Note.findOne({ _id })
    .populate('asset')
    .exec((error, note) => {
        if (error) {
            res.json({ error });
        } else {
            res.json({
                note
            })
        }
    })
}

module.exports = getNoteById;