var express = require("express");
var router = express.Router();

const DBuser = require("../database/DB/DBuser"); // User database object
const auth = require("../bin/helpers/auth"); // auth helper
const v = require('../bin/helpers/validation')

router.post("/", async function(req, res, next) {
  let userData = req.body.user; // save data form client to user obj

  
  
  await v.validate(userData, req.body.postType, DBuser)

  
  if (Object.keys(v.errors).length  > 0) {
    //console.log(v.errors)
    return res.send({errors : v.errors,
                      postType : req.body.postType })
  }
  
  

  if (req.body.postType == "signup") {
    try {
      let user = await DBuser.save(userData);
      const token = await user.generateAuthToken();
      res.cookie('user', token).send({user: authRes.user})
    } catch (error) {
      res.json(error.message);
    }
  } else if (req.body.postType == "signin") {
    try {
      let authRes = await auth.attempt(userData, DBuser);

      res.cookie('user', authRes.token).send({user: authRes.user})
      
    } catch (error) {
      
      res.json({errors: error.message})
    }

   
  }
});

module.exports = router;
