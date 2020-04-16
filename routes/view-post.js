let express = require('express');
let router = express.Router();
let allPosts = require('../myPosts.json');

router.get('/:postId', function(req, res, next){
    id = req.params.postId;
    post = allPosts.myPosts[id-1]; //We should look though and find the id rather than this
    let data = {
        postId: id,
        title: post.title,
        content: post.content
    }
    res.render('view-post', data);
});

module.exports = router;