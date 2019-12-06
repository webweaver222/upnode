var express = require("express");
var router = express.Router();
const multer = require('multer')
const DBfile = require('../database/DB/DBfile')
const mkdirp = require('mkdirp')







router.post('/', (req, res) => {

  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let path = 'C:/uploads/' + year + '/' + month
  
  try {
    // create dir structure in uploads folder 
    mkdirp(path, function (err) {
      if (err) throw new Error('failed to create dir')

      var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path)
        }
      })

      const upload = multer({
        storage: storage,
        limits: {
          fileSize: 100000
        }
      }).single('upload')


      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          res.send({ error: err })
          return
        } else if (err) {
          res.send({ error: err })
          return
        }

        let doc = await DBfile.save({
          originalName: req.file.originalname.split('.')[0],
          hashName: req.file.filename,
          path: req.file.path,
          ext: req.file.originalname.split('.')[1]

        })

        
        res.send({ 
          link : req.get('host') + '/file/' + doc._id,
          message: 'file uploaded' })
      })

    })
  } catch (e) {
    res.send({ error: e.message })
  }
})

module.exports = router;