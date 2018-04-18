const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// Given an asset id, mark it for deletion, and return a success message.
deleteAssetById = (req,res) => {
    let { _id }     = req.params;
    Asset.findOneAndUpdate({ _id }, { deleted: true }, (error) => {
        if (error) {
            res.json({error});
        } else {
            Note.update({ asset: _id }, { deleted: true }, { multi: true}, (error) => {
                if (error) {
                    res.json({error});
                } else {
                    res.json({
                        message: `Asset ${_id} marked for deletion.`
                    })
                }
            })
        }
    })
};

module.exports = deleteAssetById;