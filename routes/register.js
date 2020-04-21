let express = require('express');
let router = express.Router();

router.get('/', function(req, res){
    let login_as = checkCookies(req.cookies);
    let data = {
        title: "Register",
        login: login_as,
        login_name: login_as[0],
        user_type: login_as[1]
    }

    res.render('register', data);
});

router.post('/', function(req, res){
    // Add user to the user db and redirect to home page.
});

// Need to make this function centralised somewhere. Doesnt work app.js or in separate js...
function checkCookies(cookies) {
  console.log("Cookies: ", cookies.loggedInAs);
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