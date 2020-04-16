const express = require('express');
const router = express.Router();
const myPosts = require('../myPosts.json').myPosts;

router.get('/:postId', function(req, res, next){
    let post = myPosts[req.params.postId-1];
    let data = {
        title: post.title,
        content: post.content
    }

    res.render('update-post', data);
});

module.exports = router