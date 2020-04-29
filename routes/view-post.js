let express = require('express');
let router = express.Router();
let allPosts = require('../myPosts.json');

router.get('/:postId', function(req, res, next){
  let login_as = checkCookies(req.cookies);
  // The workaround for showing the updates on the page after redirecting.
  // Otherwise after maling the patch request, the user would need to refresh page.
  setTimeout(() => {
    // ToDo: Loop through posts to find that id (currently referencing the index via id)
    id = req.params.postId;
    post = allPosts.myPosts[id-1]; 
    let data = {
      postId: id,
      title: post.title,
      content: post.content,
      featured_img: post.featured_img,
      author: post.author,
      published_date: post.published_date,
      login: login_as
    }
    res.render('view-post', data);
    
  }, 200);
  // Note - 150ms is the lowest Ive tested with that works. 100ms is too quick for instance.
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