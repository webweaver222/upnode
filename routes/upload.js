var express = require("express");
var router = express.Router();
const multer = require('multer')

const upload = multer({
    dest: 'files'
})

router.post('/', upload.single('upload'), (req, res) => {
   res.send()
})




module.exports = router;