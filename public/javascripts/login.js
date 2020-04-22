'use strict'
// Remove bootstrap's highlighting after button click:
// Not quite working yet..
let allButtons = document.querySelectorAll('button');
if(allButtons) {
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.dir(this);
            blur();
        });
    });
}


// Logout:
// Clear the cookie.
let logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn) {
    logoutBtn.addEventListener('click', () =>{ 
        document.cookie = "checkLogin=;";
    });
}