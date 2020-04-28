let express = require('express');
let router = express.Router();
let request = require('request');
let allUsers = require('../users.json').allUsers;
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res){
  let login_as = checkCookies(req.cookies);
  let data = {
      title: "Register",
      login: login_as
  }

  res.render('register', data);
});

router.post('/', 
[
  check('email').isEmail(), 
  check('password').isLength({min:3})
], 
function(req, res){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }

  let newUserID = allUsers.length + 1;
  request({
    url: "http://localhost:3000/allUsers/",
    method: "POST",
    form: {
      id: newUserID,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      permissions: "RUM",
      subscribed_to_newsletter: req.body.newsletterCheckbox ? true : false
    }
  }, function(error, response, body){
    console.log("Error: ", error);
    console.log("New user: ", JSON.stringify(body));
    // Try to set the cookie details so that the user may be logged in immediately:
    // This results in multiple headers being set :(
    // res.cookie('checkLogin', JSON.stringify(body.first_name));
  });
  res.redirect('/');
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