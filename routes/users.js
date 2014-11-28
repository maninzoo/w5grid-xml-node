var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  debugger;
  res.set( 'Content-Type', 'application/xml' );
  res.send( '<response></response>' );
});

module.exports = router;
