let express = require('express');
let router = express.Router();


router.get('/', function(req, res, next) {
  res.sendFile('wishlist.html', {root: '../public'});
});


module.exports = router;
