var express = require("express");
var router = express.Router();

const DBuser = require("../database/DB/DBuser"); // User database object
const auth = require("../bin/helpers/auth"); // auth helper

router.post("/", async function(req, res, next) {
  let userData = req.body.user; // save data form client to user obj

  /* backend data validation goes here... */

  if (req.body.postType == "signup") {
    try {
      let user = await DBuser.save(userData);
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (error) {
      res.json(error.message);
    }
  } else if (req.body.postType == "signin") {
    try {
      let authRes = await auth.attempt(userData, DBuser);
      if (!auth) console.log("fail to auth");
      else {
        console.log("success to auth");
        res.cookie('user', authRes.token).send({user: authRes.user})
      }
    } catch (error) {
      res.json(error.message);
    }

   
  }
});

module.exports = router;
