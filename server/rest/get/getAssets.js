const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// Return all assets.
// Does not populate the notes fields.
getAssets = (req,res) => {
    Asset.find((error, assets) => {
        if (error) {
            res.json({error});
        } else {
            res.json({ assets })
        }
    })
};

module.exports = getAssets;