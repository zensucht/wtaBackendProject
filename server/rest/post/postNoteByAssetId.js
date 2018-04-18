const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// When given an asset ID, create a new note and associate it with that asset
postNoteByAssetId = (req, res) => {
    let { _id }     = req.params;
    let noteBody    = req.body.note;

    Asset.findOne({_id, deleted: {$ne: true }}, (error, asset) => {
        console.log("asset:", asset);
        if (error) {
            res.json({error})
        } else if (asset) {
            let note = new Note();
            note.set({
                asset: _id,
                note: noteBody
            });
            note.save((error, note) => {
                console.log("asset:", asset)
                if (error) {
                    res.json({error});
                } else {
                    console.log("asset.notes:", asset.notes)
                    asset.notes.push(note._id);
                    asset.save((error) => {
                        if (error) {
                            res.json({ error });
                        } else {
                            res.json({
                                message: `Note saved to asset  ${_id}`,
                                note
                            })
                        }
                    })
                }
            })
        } else {
            res.json({
                error: `Could not find asset ${_id}`
            })
        }
    })
}

module.exports = postNoteByAssetId;