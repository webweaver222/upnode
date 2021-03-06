var express = require("express");
var router = express.Router();
const multer = require('multer')
const DBfile = require('../database/DB/DBfile')
const mkdirp = require('mkdirp')
const authMiddleware = require('../bin/middleware/authMiddleware')



function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}


router.post('/', authMiddleware, (req, res) => {

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
          
          cb(null,  path) 
        },
        
      })

      const upload = multer({
        storage: storage,
        limits: {
          fileSize: 85000000
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

        console.log(req.user)

        let doc = await DBfile.save({
          originalName: req.file.originalname.split('.')[0],
          path: req.file.path.replace("C:\\uploads", ""), 
          ext: req.file.originalname.split('.').pop(),
          uploader: (req.user) ? req.user._id : null,
          size: formatBytes(req.file.size)
        })

        
        res.send({ 
          link : req.get('host') + '/file/' + doc._id,
          message: 'file uploaded' })
      })

    })
  } catch (e) {
      console.log(e)
    res.send({ error: e.message })
  }
})

module.exports = router;