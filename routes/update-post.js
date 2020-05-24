const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/:postId', function(req, res, next){
  let login_as = checkCookies(req.cookies);
  id = id = req.params.postId;
  
  setTimeout(() => {
    request.get(
      'http://localhost:8000/myPosts/' + id,
      function(error, response, body) {
        let data = {
          title: "TravelevarT",
          login: login_as,
          message: 0,
          post: JSON.parse(body)
        }
        // console.log("Body of second: ", JSON.parse(body));
        res.render('update-post', data);
      }
    )
  }, 200);
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
    url: "http://localhost:8000/myPosts/" + req.params.postId,
    method: "DELETE"
  }, function(error, response, body){
    console.log(JSON.stringify(error));
  });
  
  res.redirect('/');
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