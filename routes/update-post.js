const express = require('express');
const router = express.Router();
const myPosts = require('../myPosts.json').myPosts;
const request = require('request');

router.get('/:postId', function(req, res, next){
  let post = myPosts[req.params.postId-1];
  let login_as = checkCookies(req.cookies);
  let data = {
    id: post.id,
    title: post.title,
    subtitle: post.subtitle,
    featured_img: post.featured_img,
    content: post.content,
    login: login_as
  }
  
  res.render('update-post', data);
});


router.post('/:postId', function(req, res, next){
  request({
    url: "http://localhost:8000/myPosts/" + req.params.postId,
    method: "PATCH",
    form: {
      title: req.body.postTitle,
      subtitle: req.body.postSubtitle,
      featured_img: req.body.postImage,
      content: req.body.editordata
    }
  },function(error, response, body){
    console.log("Updated post, " + JSON.stringify(body.title));
  });
  
  res.redirect('/view-post/'+req.params.postId);
});

router.post('/delete/:postId', function(req, res, next){
  request({
    url: ""
  })
  
  // res.redirect('/');
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

module.exports = router