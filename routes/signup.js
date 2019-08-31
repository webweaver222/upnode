var express = require('express');
var router = express.Router();

const DBuser = require('../database/DB/DBuser') // User database object

router.post('/', function(req, res, next) {
    let userData = req.body.user // save data form client to user obj

    let test = DBuser.save(userData)
    .then((user) => {
        //res.send(user)
    })
    .catch((error) => {
        res.send(error)
    })
    

    
});
  
module.exports = router;