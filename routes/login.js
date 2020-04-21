let express = require('express');
let router = express.Router();
let request = require('request');

router.get('/', function(req, res){
    res.send("Logging in as " + req.cookies.checkLogin);
});

module.exports = router;