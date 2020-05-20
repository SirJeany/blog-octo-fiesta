'use strict'

// Frontend Validation:



// Logout:
// Clear the cookie.
let logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn) {
    logoutBtn.addEventListener('click', () =>{ 
        document.cookie = "checkLogin=;path=/;"; // The path=/ is important, otherwise the logout will set a cookie to nothing only at that specific path -> like /views 
    });
}