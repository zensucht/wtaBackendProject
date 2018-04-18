module.exports = {
    getNoteById: require('./get/getNoteById'),
    getAssetById: require('./get/getAssetById'),
    getAssets: require('./get/getAssets'),
    patchAssetById: require('./patch/patchAssetById'),
    patchNoteById: require('./patch/patchNoteById'),
    postNoteByAssetId: require('./post/postNoteByAssetId'),
    postAsset: require('./post/postAsset'),
    deleteAssetById: require('./delete/deleteAssetById'),
    purgeAssetById: require('./purge/purgeAssetById')
};