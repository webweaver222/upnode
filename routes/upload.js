var express = require("express");
var router = express.Router();
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/uploads')
    }
  })



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000
    }
}).single('upload')

router.post('/', (req, res) => {
   
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send({error: err})
          return
        } else if (err) {
            res.send({error: err})
            return
        }
    
        res.send({message: 'file uploaded'})
      })

   
})




module.exports = router;