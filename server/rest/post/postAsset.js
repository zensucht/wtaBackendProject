const mongoose          = require('mongoose');

const { Note, Asset }   = require('../../mongo');

// When given a uri and a name, create a new asset record.
postAsset = (req,res) => {
    let { uri, name }   = req.body;
    let asset = new Asset();
    asset.set({
        uri,
        name
    });
    asset.save((error, asset) => {
        if (error) {
            res.json({ error });
        } else {
            res.json({ 
                message: 'Asset created.',
                asset
            });
        }
    })
};

module.exports = postAsset;