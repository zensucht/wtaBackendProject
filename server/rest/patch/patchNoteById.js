const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// When given an id update that record with the new note text.
patchNoteById = (req,res) => {
    let { _id }         = req.params;
    let { note }        = req.body;
    Note.findOneAndUpdate({ _id, deleted: {$ne: true} }, { note }, (error, updatedNote) => {
        if (error) {
            res.json({ error });
        } else if (updatedNote) {
            res.json({
                message: `Note ${_id} updated.`
            })
        } else {
            res.json({ error: `Note ${_id} not found.`})
        }
    })
}

module.exports = patchNoteById;