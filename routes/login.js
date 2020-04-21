let express = require('express');
let router = express.Router();
let request = require('request');

router.get('/:name/:email', function(req, res){
    res.send(req);
});

module.exports = router;