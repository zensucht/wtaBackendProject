const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const mongoose      = require('mongoose');

const { Note, 
        Asset }     = require('./mongo');

const { getNoteById,
        getAssetById,
        getAssets,
        patchNoteById,
        postNoteByAssetId,
        postAsset,
        deleteAssetById,
        purgeAssetById
      }             = require('./rest');

var app             = express();

const expressPort   = 8080;

// Tell express to log all http requests to console.
app.use(morgan('dev'));

// For handling POST, PUT, PATCH correctly
// Parses the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router          = express.Router();

// For every request this function will be run
router.use((req,res,next) => {
    // Good location to put logging
    console.log("Received request.");
    next();
});

// Supply a generic message when someone hits the root url
router.get('/', (req,res) => {
    res.json({ message: 'Nothing here.'});
});

// http://hostname:port/api/asset/
// Methods:
//  POST: Creates an asset
//      Input: 
//          { uri: string,
//            name: string }
//      Returns:
//          { message: string }
router.route('/asset')
    .post((req,res) => postAsset(req,res))

// http://hostname:port/api/assets/
// Methods:
//  GET: Returns a list of all assets
//      Input: None 
//      Returns:
//            { assets: 
//                [
//                    { _id: ID,
//                    notes: [ ID ],
//                    deleted: boolean,
//                    uri: string,
//                    name: string 
//                    }
//                ]
//            } 
router.route('/assets')
    .get((req,res) => getAssets(req,res))

// http://hostname:port/api/asset/id
// Methods:
//  GET: Returns a singular asset by its id
//      Input: NONE
//      Returns:
//            { asset: 
//                { _id: ID,
//                  notes: [ ID ],
//                  deleted: boolean,
//                  uri: string,
//                  name: string 
//                }
//            } 
//
//  DELETE: Marks an asset and its notes for deletion
//      Input: NONE
//      Returns: { message: string }
//
//  PURGE: Immediately removes an asset and its notes from the database
//      Input: NONE
//      Returns: { message: string }
router.route('/asset/:_id')
    .get((req,res) => getAssetById(req,res))
    .delete((req,res) => deleteAssetById(req,res))
    .purge((req,res) => purgeAssetById(req,res))

// http://hostname:port/api/asset/id/note
// Methods: 
//  POST: Creates a new note associated with the asset
//      Input: { note: string }
//      Returns: { message: string }    
router.route('/asset/:_id/note')
    .post((req,res) => postNoteByAssetId(req,res))
    
// http://hostname:port/api/asset/id/note/id
// Methods:
//  PATCH: Updates a note
//      Input: { note: string }
//      Returns: { message: string }
router.route('/asset/:_id/note/:note_id')
    .patch((req,res) => patchNoteById(req,res))

// http://hostname:port/api/note/id
// Methods: 
//  GET: Returns a singular note, with it's associated asset populated
//      Input: NONE
//      Returns:
//          { note: 
//              { deleted: boolean,
//                _id: ID,
//                asset: { ...Asset Object... }
//                note: string
//              }
//          }      
//
//  PATCH: Updates a note by it's ID
//      Input: { note: string }
//      Returns: { message: string }
router.route('/note/:_id')
    .get((req,res) => getNoteById(req,res))
    .patch((req,res) => patchNoteById(req,res))

// Attach all the rest routes to /api
app.use('/api', router);

// Start the HTTP server
app.listen(expressPort, () => {
    console.log(`Server running on port ${expressPort}`);
});