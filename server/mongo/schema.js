const mongoose          = require('mongoose');

var Schema              = mongoose.Schema;

// Schema for notes:
//  note: note content
//  asset: id link to the asset the note is associated with
const noteSchema        = new mongoose.Schema({
    note: String,
    asset: {type: Schema.Types.ObjectId, ref: 'Asset'},
    deleted: {type: Boolean, default: false}
})

// Schema for assets:
//  _id: record id
//  uri: uri of asset
//  name: description of the asset
//  notes: link to the notes associated with the asset
const assetSchema       = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    uri: String,
    name: String,
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
    deleted: {type: Boolean, default: false}
})

var Note                = mongoose.model('Note', noteSchema);
var Asset               = mongoose.model('Asset', assetSchema);

module.exports = {
    Note,
    noteSchema,
    Asset,
    assetSchema
};