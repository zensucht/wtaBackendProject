// const ConnectionString  = 'mongodb://assetsuser:s3cur3passw0rd@ds247449.mlab.com:47449/wt_assets';
const ConnectionString  = require('../config/mongo.json').ConnectionString;

const mongoose          = require('mongoose');
                          mongoose.connect(ConnectionString);
// TODO: add on error and once open functions for mongoose

const { Note, Asset }   = require('./schema');

module.exports = {
    mongoose,
    Note,
    Asset
};
                 
