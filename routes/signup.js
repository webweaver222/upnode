var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body.user)
    res.send({word: 'иди ты назуй козел'})
});
  
module.exports = router;