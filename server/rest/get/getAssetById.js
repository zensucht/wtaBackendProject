const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// When given an id return the asset associated with that id
getAssetById = (req,res) => {
    let { _id }     = req.params;
    Asset.findOne({_id})
    .populate('notes')
    .exec((error, asset) => {
        if (error) {
            res.json({error});
        } else {
            res.json({ asset });
        }
    })
};

module.exports = getAssetById;