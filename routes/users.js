var express = require('express');
var router = express.Router();
var _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  var responseBody = '';

  res.set( 'Content-Type', 'application/xml' );

  if ( req.body.request.work[0].$.value === 'fetch' ) {
    var data = [
      "<CCCEA17><first_name value='James'/><last_name value='Butt'/><company_name value='Benton, John B Jr'/><address value='6649 N Blue Gum St'/><city value='New Orleans'/><county value='Orleans'/><state value='LA'/><zip value='70116'/><phone1 value='504-621-8927'/><phone2 value='504-845-1427'/><email value='jbutt@gmail.com'/><web value='http:&#x2F;&#x2F;www.bentonjohnbjr.com'/></CCCEA17>",
      "<CCCEA17><first_name value='Art'/><last_name value='Venere'/><company_name value='Chemel, James L Cpa'/><address value='8 W Cerritos Ave #54'/><city value='Bridgeport'/><county value='Gloucester'/><state value='NJ'/><zip value='8014'/><phone1 value='856-636-8749'/><phone2 value='856-264-4130'/><email value='art@venere.org'/><web value='http:&#x2F;&#x2F;www.chemeljameslcpa.com'/></CCCEA17>"
    ];

    if ( req.body.request.target[0].$.value === 'all' ) {
      responseBody += '<vector>';
      responseBody = _.reduce( data, function( memo, item ) {
        return memo += '<data>' + item + '</data>';
      }, responseBody );
      responseBody += '</vector>';
    } else if ( req.body.request.target[0].$.value === '0' ) {
      responseBody = data[0];
    }
  } else {
    responseBody = "<response></response>";
  }
  res.send(responseBody);
});

module.exports = router;

//responseBody = "<msg1>" +
//              "  <node1 value='바나나' attr1='가' attr2='나'/>" +
//              "  <node2 value='딸기' attr1='다' />" +
//              "  <node3 value=''/>" +
//              "  <header>" +
//              "    <header1 value='1'/>" +
//              "    <header2 value='2'/>" +
//              "  </header>" +
//              "  <body>" +
//              "    <body1 value='3'/>" +
//              "    <body2 value='4'/>" +
//              "    <rec1 type='java.util.Vector'>" +
//              "      <vector result='2'>" +
//              "        <data vectorkey='0'>" +
//              "          <CCCE017>" +
//              "            <nContactType value='1'/>" +
//              "            <nCallType value='0'/>" +
//              "          </CCCE017>" +
//              "        </data>" +
//              "        <data vectorkey='1'>" +
//              "          <CCCE017>" +
//              "            <nContactType value='1'/>" +
//              "            <nCallType value='0'/>" +
//              "          </CCCE017>" +
//              "        </data>" +
//              "      </vector>" +
//              "    </rec1>" +
//              "  </body>" +
//              "  <footer value='키위'/>" +
//              "</msg1>";