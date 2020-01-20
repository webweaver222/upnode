var express = require("express");
var router = express.Router();
const DBfile = require('../database/DB/DBfile')

router.post('/', async function(req, res) {
    let uploads = await DBfile.fetchRecent(req.body)
})


module.exports = router