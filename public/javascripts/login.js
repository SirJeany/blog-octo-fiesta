'use strict'
// Remove bootstrap's highlighting after button click:
let allButtons = document.querySelectorAll('button');
if(allButtons) {
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {this.blur();});
    });
}


// Logout:
// Clear the cookie.
let logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn) {
    logoutBtn.addEventListener('click', () =>{ 
        document.cookie = "loggedInAs=;";
    });
}