const express = require('express');
const router = express.Router();
const myPosts = require('../myPosts.json').myPosts;
const request = require('request');

router.get('/:postId', function(req, res, next){
    let post = myPosts[req.params.postId-1];
    let data = {
        title: post.title,
        content: post.content
    }

    res.render('update-post', data);
});


router.post('/:postId', function(req, res, next){
    request({
        url: "http://localhost:8000/myPosts" + req.params.postId,
        method: "UPDATE",
        form: {
            title: req.body.postTitle,
            content: req.body.editordata
        }
    })
});


module.exports = router