let express = require('express');
let router = express.Router();
let request = require('request');

router.get('/', function(req, res){
    let email = req.session.email.toLowerCase();
    let password = req.session.password;
    let user_name = '';
    let found = false;
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
            if(email === user.email && password === user.password) {
                user_name = user.first_name;
                found = true;
            }
        }
        // Check if the login details were found:
        if(found) {
            res.cookie('checkLogin', user_name);
        } else {
            res.cookie('checkLogin', 'invalid_login', {maxAge: 2000}); // Invalid login message expires
        }

        // res.redirect(req.get('referer')); // Refresh current page 
        res.redirect('/');
    });
    
    /*
    // To be changed to request
    for(let i = 0; i < Users.length && !found; i++){
        if(email === Users[i].email && password === Users[i].password){
            user_name = Users[i].first_name;
            found = true;
        }
    }
    // Now set the cookie details if found:
    if(found) {
        res.cookie('checkLogin', user_name);
    } else {
        res.cookie('checkLogin', 'invalid_login');
    }
    
    // res.redirect('/')
    res.redirect(req.get('referer')); // Refresh current page 
    */
});

router.post('/', function(req, res){
    console.log(req.body)
    req.session.email = req.body.emailInput;
    req.session.password = req.body.passwordInput;

    res.redirect('/login');
})

module.exports = router;