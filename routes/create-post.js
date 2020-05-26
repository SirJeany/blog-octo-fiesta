let express = require('express');
let router = express.Router();
let request = require('request');
let Posts = require('../myPosts.json');
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res, next){
  let login_as = checkCookies(req.cookies);
  let data = {
    title: "Create Post",
    login: login_as
  }
  
  res.render('create-post', data);
});

// Create a new post with the ID as the created date and time.
// Using JS Date.now() we get a unique id, which is the amount 
// of milliseconds that have elapsed since Jan 1, 1970.
router.post('/',
[
  // Error checking:
  check('postTitle').isLength({min: 5}),
  check('postSubtitle').isLength({min: 5, max: 100}),
  check('postAuthor').isLength({min: 3}),
  check('postImage').not().isEmpty().isURL(),
],
function(req, res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  // Date published:
  let d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let published_date = d.getDate() + " " + months[d.getMonth()] + " - " + d.getFullYear();
  
  // New id:
  const postId = Date.now();

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