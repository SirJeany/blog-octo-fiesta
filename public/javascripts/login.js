'use strict'

// Frontend Validation:



// Logout:
// Clear the cookie.
let logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn) {
    logoutBtn.addEventListener('click', () =>{ 
        document.cookie = "checkLogin=;";
    });
}