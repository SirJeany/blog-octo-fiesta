let express = require('express');
let router = express.Router();
let request = require('request');

router.get('/:postId', function(req, res, next){
  let login_as = checkCookies(req.cookies);
  // The workaround for showing the updates on the page after redirecting.
  // Otherwise after making the patch request, the user would need to refresh page.
  id = req.params.postId;
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
        res.render('view-post', data);
      }
    )
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