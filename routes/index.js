let express = require('express');
let router = express.Router();
let request = require('request');
// let cookie = require('cookie');
let users = require('../users.json').allUsers;
// import {checkCookies} from 'loginFunc.js';

//TEST NExt: It kinda works. But how do we send data through?
// router.get('/', function(req, res, next) {
//   request.get(
//     'http://localhost:8080/allUsers/',
//     function(error, response, body) {
//       if(JSON.parse(body)[0].id === 1) {
//         console.log("sending to next route")
//         next('route')
//       }
//     });
  
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  let login_as = checkCookies(req.cookies);
  
  setTimeout(() => {
    request.get(
      'http://localhost:8000/myPosts/',
      function(error, response, body) {
        let data = {
          title: "Home",
          login: login_as,
          posts: JSON.parse(body)
        }
        // console.log("Body of second: ", JSON.parse(body));
        res.render('index', data);
      }
    );
    // let data = {
    //   title: "Home",
    //   login: login_as[0],
    //   user_type: login_as[1]
    // }
    // res.render('index', data);
  }, 200);
});

// Need to make this function centralised somewhere. Doesnt work app.js or in separate js...
function checkCookies(cookies) {
  console.log("Cookies: ", cookies);
  let loggedInAs = cookies.checkLogin;
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
