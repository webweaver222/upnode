var express = require("express");
var router = express.Router();
const authMiddleware = require('../bin/middleware/authMiddleware')

router.post("/", authMiddleware ,async function(req, res, next) {

if (!req.token) res.status(401).send({error: 'Please authenticate'})
 
else {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
    
        res.clearCookie("user").send({})
    } catch(e) {
        res.status(500).send({error: e})
    }

   
}
   
})

module.exports = router;