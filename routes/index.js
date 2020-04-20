let express = require('express');
let router = express.Router();
// var cookieParser = require('cookie-parser');
let users = require('../users.json').allUsers;

/* GET home page. */
router.get('/', function(req, res, next) {
  let login_as = checkCookies(req.cookies);
  // Settimeout to combat updates to the page without needing to refresh
  setTimeout(() => {
    let data = {
      title: "Home",
      login: login_as
    }
    res.render('index', data);
  }, 150);
});

// Need to make this function centralised somewhere. Doesnt work app.js or in separate js...
function checkCookies(cookies) {
  console.log("Cookies: ", cookies);
  let loggedInAs = cookies.loggedInAs;
  try {
    if(loggedInAs.length > 0) {
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
