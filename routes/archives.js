const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res){
    let login_as = checkCookies(req.cookies);
    request.get(
        'http://localhost:8000/myPosts/',
        function(error, res, body){
            let data = {
                title: "Archives",
                login: login_as,
                posts: JSON.parse(body)
            }
        }
    );
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