var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Settimeout to combat updates to the page without needing to refresh
  setTimeout(() => {
    let data = {
      title: "Home"
    }
    res.render('index', data);
  }, 150);
});

module.exports = router;
