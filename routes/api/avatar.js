const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Profile = require('../../models/Profile');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const ObjectID = require('mongodb').ObjectID;

//mongo URI
const config = require('config');
const mongoURI = config.get('mongoURI');

//create mongo connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Init gfs
conn.once('open', (req, res) => {
  //Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((res, rej) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          //the bucketName needs to match the collection name
          bucketName: 'uploads',
        };
        res(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

//@route   POST /api/upload
//@desc    Uploads file to DB
//@access  Private

router.post('/upload', [auth, upload.single('file')], async (req, res) => {
  res.json({ file: req.file });
  const avatarId = req.file.id;
  try {
    const profile = await Profile.findById(req.profile.id);
    profile.avatarId = avatarId;
    await profile.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET /image/:avatarId
// @desc   Display image by avatarId
// @Access Public

router.get('/image/:id', (req, res) => {
  gfs.files.findOne({ _id: ObjectID(req.params.id) }, (err, file) => {
    // Check if files exist
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    //Read output to browser
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

//GET avatar
//access: private
router.get('/', (req, res) => {
  res.send('avatar');
});

module.exports = router;
