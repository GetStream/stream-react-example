var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
  res.render('index', {
      title: 'GetStream.io - React Example App',
      css: process.env.NODE_ENV == 'PRODUCTION' ? '/css/styles.min.css' : '/css/styles.css',
  });
});

module.exports = router;
