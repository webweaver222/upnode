var express = require("express");
var router = express.Router();
const DBfile = require('../database/DB/DBfile')
const moment = require('moment')

router.post('/', async function(req, res) {
    try {
        let files = await DBfile.fetchRecent(req.body)
        

        for (let i =0; i < files.length; i++) {
            await files[i].getUploader()            
        }
       

        res.send({recentFiles: files})
    } catch (e) {
        console.log(e)
    }
})


module.exports = router