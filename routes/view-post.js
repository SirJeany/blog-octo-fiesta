let express = require('express');
let router = express.Router();
let allPosts = require('../myPosts.json');

router.get('/:postId', function(req, res, next){
    id = req.params.postId;
    post = allPosts[id-1];
    let data = {
        title: post.title,
        content: post.content
    }
});

module.exports = router;