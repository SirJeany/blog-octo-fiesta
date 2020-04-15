let express = require('express');
let router = express.Router();
let request = require('request');
let Posts = require('../myPosts.json');
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    let data = {
        title: "Create Post"
    }

    res.render('create-post', data);
});

router.post('/', function(req, res, next){
    console.log("Body: ", req.body);
    let myPosts = Posts.myPosts;
    let postId = myPosts.length+1;
    request({
        url: "http://localhost:8000/myPosts",
        method: "POST",
        form: {
            id: postId,
            title: req.body.postTitle,
            content: req.body.editordata
        }
    },
    function(error, response, body){
        console.log("Body: ", JSON.stringify(body));
        // res.render.apply('create-post', {message: "Created new post"});
        console.log("Response: ", response);
        console.log("Error: ", error);
    });

    res.redirect('view-post/' + postId);
});

module.exports = router;