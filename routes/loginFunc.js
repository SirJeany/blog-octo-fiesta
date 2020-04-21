'use strict';
// require = require("esm")(module);

export function checkCookies(cookies) {
    console.log("Cookies: ", cookies);
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

module.exports = require('index.js');