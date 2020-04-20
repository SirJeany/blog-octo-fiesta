'use strict'
// let users = require('../../users.json').allUsers; //cant do this >.<

// Functionality for user login:
// Each page's header contains the login form.
// If logged in: display "Hi there /user_first_name/!" With a logout button.
// If No login: Display an option to login using email and pswrd or to Register.
// Filling in the form with correct login details should then log in the user and 
// display the as shown in 'if logged in'
// Clicking on 'Register' takes the user to the register page.
    
// NOTE: current user identity (so knowing if logged in or not) is held as a cookie.

// !! THIS IS NO LONGER DONE HERE ^ Now we run an if statement in the start_html.ejs

// Login:
// Check if the details corrosponds to the users db, then:
// Add to the cookie. 
// ToDO: link up users with server?
/*
let loginBtn = document.getElementById('loginBtn');

if(loginBtn){
    
    let emailInput = document.getElementById('emailInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    
    loginBtn.addEventListener('click', () => {
        let found = false; // Check if user was found
        let foundUser = -1; // the index at which the user was found
        // Look through db for login details.
        for(let i = 0; i < users.length && !found; i++){
            alert(users[i]);
            if(users[i].email == emailInput && users[i].password == passwordInput) {
                found = true;
                foundUser = i;
            }
        }

        // If the user was found:
        if(found){
            document.cookie = "loggedInAs=" + users[foundUser].first_name;
        }
    });
}
*/

// Logout:
// Clear the cookie.
let logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn) {
    logoutBtn.addEventListener('click', () =>{ 
        document.cookie = "loggedInAs=;";
    });
}