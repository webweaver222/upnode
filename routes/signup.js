var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send({word: 'h1'})
});
  
module.exports = router;