let express = require('express');
let router = express.Router();
// let cookie = require('cookie');
let users = require('../users.json').allUsers;
// import {checkCookies} from 'loginFunc.js';

/* GET home page. */
router.get('/', function(req, res, next) {
  let login_as = checkCookies(req.cookies);
  // var setCookie = cookie.serialize('foo', 'bar');
  // Settimeout to combat updates to the page without needing to refresh
  setTimeout(() => {
    let data = {
      title: "Home",
      login: login_as[0],
      user_type: login_as[1]
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
          return loggedInAs.split('|');
      } else {
          return -1;
      }
  } catch (error) {
      console.log('No cookie, so no data for login');
      return -1;
  }
}

module.exports = router;
