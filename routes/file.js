var express = require("express");
var router = express.Router();
const DBfile = require('../database/DB/DBfile')
const authMiddleware = require('../bin/middleware/authMiddleware')
const icons = require('file-icons-js')

router.get('/:file_id', authMiddleware, async function(req, res)  {
   
    if(req.params.file_id.length !== 24) {
        res.send({error: 'File not found'})
        return
    }

   

    try {
        let file = await DBfile.fetch(req.params.file_id)

        await file.populate( {path : 'uploader'}).execPopulate()
        
       
        file.className = icons.getClass(file.originalName + '.' + file.ext);
        if (!file.className) file.className = 'zip-icon'
    

        file.url = 'http://' + req.headers.host + '/files' + file.path 
        if (!req.user) {
            res.render('index', { title: 'Express', theFile: file});
          } else {
            res.render('index', { title: 'Express', theUser: req.user, theFile: file});
          }
        
        
    } catch (e) {
        res.send(e)
    }

    


})


module.exports = router