let express = require('express');
let router = express.Router();
let request = require('request');
let allUsers = require('../myPosts.json').allUsers;
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res){
  let login_as = checkCookies(req.cookies);
  let data = {
      title: "Register",
      message: 0,
      login: login_as
  }

  res.render('register', data);
});

// express-validator format for server-side validation:
router.post('/', 
[
  // ToDo: stronger error checking with names?
  check('firstName').isLength({min:2}),
  check('lastName').isLength({min:2}),
  check('email').isEmail(), 
  check('password').isLength({min:3})
], 
function(req, res, next){
  // Check errors:
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }

  let found = false;
  let userCount = 0;
  const email = req.body.email;
  // First, make a get request to see if the user exists. We also want to know how many users there are currently
  request({
    uri: "http://localhost:8000/allUsers/",
    method: "GET"
  },
  function(error, response, body){
    const allUsers = JSON.parse(body); // get js object
    // Length or size of an object = https://stackoverflow.com/questions/5223/length-of-a-javascript-object
    // MDN: Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
    for (let i = 0; i < Object.keys(allUsers).length && !found; i++) {
      const user = allUsers[i];
      if(email === user.email) {
        console.log("User found with email " + email + ": " + user.first_name)
        found = true;
      }
    }

    // Set usercount for when we need to update the id...
    userCount = Object.keys(allUsers).length;

    // Now check if there was a user found:
    if(found) {
      res.render('register', {title: "register", message: "User with that email already exists", login: -1})
    } else { // if no user with those credentials were found:
      // Complete Post request:
      request({
        url: "http://localhost:8000/allUsers/",
        method: "POST",
        form: {
          id: userCount + 1,
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          permissions: "RUM",
          subscribed_to_newsletter: req.body.newsletterCheckbox ? true : false
        }
      }, function(error, response, body){
        res.render('register', {title: "register", message: "Created new user", login: -1})
      });
    }
  });
});

// Need to make this function centralised somewhere. Doesnt work app.js or in separate js...
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