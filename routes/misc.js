let express = require('express');
let router = express.Router();

router.get('/privacy', function(req, res){
    let login_as = checkCookies(req.cookies);
    let data = {
        title: "Privacy Statement",
        login: login_as
    }
    
    res.render('privacy', data);
});

function checkCookies(cookies) {
    console.log("Cookies: ", cookies);
    let loggedInAs = cookies.checkLogin;
    try {
        if(loggedInAs.length > 0) {
            if(loggedInAs == "invalid_login") {
                return -2;
            } 
            else {
                return loggedInAs;
            }
        } 
        else {
            return -1;
        }
    } catch (error) {
        console.log('No cookie, so no data for login');
        return -1;
    }
}

module.exports = router;