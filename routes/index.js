var express = require('express');
var router = express.Router();
var urlHelper = require('../helpers/url');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/accounts/:accountGuid/brands/:brandGuid/foo', function(req, res) {
  res.locals.url = urlHelper(req.url);
  res.render('foo', { title: 'Foo' });
});

module.exports = router;
