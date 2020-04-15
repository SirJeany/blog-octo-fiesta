let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next){
    let data = {
        title: "Create Post"
    }

    res.render('create-post', data);
});

module.exports = router;