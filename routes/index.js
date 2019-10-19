var express = require('express');
var router = express.Router();
const authMiddleware = require('../bin/middleware/authMiddleware')

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {

  
  if (!req.user) {
    res.render('index', { title: 'Express'});
  } 

  res.render('index', { title: 'Express', theUser: req.user});

});

module.exports = router;
