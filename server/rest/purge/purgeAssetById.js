const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// When given an id, remove the associated asset from the database.
purgeAssetById = (req,res) => {
    let { _id }     = req.params;
    Asset.remove({_id}, (error) => {
        if (error) {
            res.json({error});
        } else {
            Note.remove({ asset: {$eq: _id }}, (error) => {
                if (error) {
                    res.json({error});
                } else {
                    res.json({
                        message: `Asset ${_id} deleted.`
                    })
                }
            })
        }
    })
};

module.exports = purgeAssetById;