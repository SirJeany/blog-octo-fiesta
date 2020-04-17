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

// router.get('/:postId', function(req, res, next){
//     request({
//         uri: "http://localhost:8000/myPosts/" + 
//     })
// });

router.post('/:postId', function(req, res, next){
    console.log("req.body.postTitle = " + req.body.postTitle);
    request({
        url: "http://localhost:8000/myPosts/" + req.params.postId,
        method: "PATCH",
        form: {
            title: req.body.postTitle,
            content: req.body.editordata
        }
    },function(error, response, body){
        console.log("The new body:", body);
    });
    
    res.redirect('/view-post/'+req.params.postId);
    
    // TRIED--> Workaround for directing to updated post (user needs to refresh currently).
    // let post = myPosts[req.params.postId-1];
    // let data = {
    //     postId: post.id,
    //     title: post.title,
    //     content: post.content
    // }
    // 
    // res.render.apply('/view-post/'+req.params.postId, {message: "Successful", data});
});


module.exports = router