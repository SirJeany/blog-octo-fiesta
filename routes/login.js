let express = require('express');
let router = express.Router();
let request = require('request');
let Users = require('../myPosts.json').allUsers;

router.get('/', function(req, res){
    let email = req.session.email.toLowerCase();
    let password = req.session.password;
    let user_name = '';
    let found = false;
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
    
    res.redirect('/')
});

router.post('/', function(req, res){
    console.log(req.body)
    req.session.email = req.body.emailInput;
    req.session.password = req.body.passwordInput;

    res.redirect('/login');
})

module.exports = router;