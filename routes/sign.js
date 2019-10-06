var express = require('express');
var router = express.Router();


const DBuser = require('../database/DB/DBuser') // User database object
const auth = require('../bin/helpers/auth') // auth helper


router.post('/',  async function(req, res, next) {
    let userData = req.body.user // save data form client to user obj


    /* backend data validation goes here... */

    if (req.body.postType == 'signup') {
        try {
            let user = await DBuser.save(userData)
            res.send(user)
        } catch (e) {
            console.log(e)
        }
        

    } else if (req.body.postType == 'signin') {
       
        try {
            let authSuccess = await auth.attempt(userData, req)
            if (!authSuccess) console.log('fail to auth')
                else console.log('success to auth')
        } catch (e) {
            console.log(e)
        }
        
    
        
        /*.then(authSuccess => {
            
            if (!authSuccess) console.log('fail to auth')
                else {
                    console.log('success to auth')
                }
        })*/

       
        
    }

    
});
  
module.exports = router;