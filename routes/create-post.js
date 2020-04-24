let express = require('express');
let router = express.Router();
let request = require('request');
let Posts = require('../myPosts.json');
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    let login_as = checkCookies(req.cookies);
    let data = {
        title: "Create Post",
        login: login_as
    }

    res.render('create-post', data);
});

router.post('/', function(req, res, next){
    // New post id:
    let myPosts = Posts.myPosts;
    let postId = myPosts.length + 1;
    // Date published:
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let published_date = d.getDate() + " " + months[d.getMonth()] + " - " + d.getFullYear();
    
    request({
        url: "http://localhost:8000/myPosts/",
        method: "POST",
        form: {
            id: postId,
            title: req.body.postTitle,
            subtitle: req.body.postSubtitle,
            content: req.body.editordata,
            featured_img: req.body.postImage,
            author: req.body.postAuthor,
            published_date: published_date
        }
    },
    function(error, response, body){
        console.log("New body: ", JSON.stringify(body));
        // res.render.apply('create-post', {message: "Created new post"});
        // console.log("Response: ", response);
        console.log("Error: ", error);
    });
    console.log("New ID: ", postId);
    res.redirect('view-post/' + postId);
});

function checkCookies(cookies) {
  console.log("Cookies: ", cookies);
  let loggedInAs = cookies.checkLogin;
  try {
    if(loggedInAs.length > 0) {
      if(loggedInAs == "invalid_login") {
        return -2;
      }
      return loggedInAs;
    } else {
      return -1;
    }
  } catch (error) {
    console.log('No cookie, so no data for login');
    return -1;
  }
}

module.exports = router;