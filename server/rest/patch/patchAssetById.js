const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// When given an id return the asset associated with that id
patchAssetById = (req,res) => {
    let { _id }         = req.params;
    let { uri, name }   = req.body;
    let setVal = null;
    if (uri && name) {
        setVal = { uri, name }
    } else if (uri) {
        setVal = {uri}
    } else if (name) {
        setVal = {name}
    } else {
        res.json({error:'No values specified for asset modification'})
    }
    if (setVal) {
        Asset.findOneAndUpdate({ _id, deleted: {$ne: true} }, setVal, (error, updatedAsset) => {
            if (error) {
                res.json({error})
            } else if (updatedAsset) {
                res.json({
                    message: `Asset ${_id} updated.`
                })
            } else {
                res.json({ error: `Asset ${_id} not found.`})
            }
        })
    }
};

module.exports = patchAssetById;