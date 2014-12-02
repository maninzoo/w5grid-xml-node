var express = require('express');
var router = express.Router();
var _ = require('underscore');

var data = ["<CCCEA17><first_name value='James'/><last_name value='Butt'/><company_name value='Benton, John B Jr'/><address value='6649 N Blue Gum St'/><city value='New Orleans'/><county value='Orleans'/><state value='LA'/><zip value='70116'/><phone1 value='504-621-8927'/><phone2 value='504-845-1427'/><email value='jbutt@gmail.com'/><web value='http:&#x2F;&#x2F;www.bentonjohnbjr.com'/></CCCEA17>",
            "<CCCEA17><first_name value='Art'/><last_name value='Venere'/><company_name value='Chemel, James L Cpa'/><address value='8 W Cerritos Ave #54'/><city value='Bridgeport'/><county value='Gloucester'/><state value='NJ'/><zip value='8014'/><phone1 value='856-636-8749'/><phone2 value='856-264-4130'/><email value='art@venere.org'/><web value='http:&#x2F;&#x2F;www.chemeljameslcpa.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Lenna'/><last_name value='Paprocki'/><company_name value='Feltz Printing Service'/><address value='639 Main St'/><city value='Anchorage'/><county value='Anchorage'/><state value='AK'/><zip value='99501'/><phone1 value='907-385-4412'/><phone2 value='907-921-2010'/><email value='lpaprocki@hotmail.com'/><web value='http:&#x2F;&#x2F;www.feltzprintingservice.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Donette'/><last_name value='Foller'/><company_name value='Printing Dimensions'/><address value='34 Center St'/><city value='Hamilton'/><county value='Butler'/><state value='OH'/><zip value='45011'/><phone1 value='513-570-1893'/><phone2 value='513-549-4561'/><email value='donette.foller@cox.net'/><web value='http:&#x2F;&#x2F;www.printingdimensions.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Simona'/><last_name value='Morasca'/><company_name value='Chapman, Ross E Esq'/><address value='3 Mcauley Dr'/><city value='Ashland'/><county value='Ashland'/><state value='OH'/><zip value='44805'/><phone1 value='419-503-2484'/><phone2 value='419-800-6759'/><email value='simona@morasca.com'/><web value='http:&#x2F;&#x2F;www.chapmanrosseesq.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Mitsue'/><last_name value='Tollner'/><company_name value='Morlong Associates'/><address value='7 Eads St'/><city value='Chicago'/><county value='Cook'/><state value='IL'/><zip value='60632'/><phone1 value='773-573-6914'/><phone2 value='773-924-8565'/><email value='mitsue_tollner@yahoo.com'/><web value='http:&#x2F;&#x2F;www.morlongassociates.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Leota'/><last_name value='Dilliard'/><company_name value='Commercial Press'/><address value='7 W Jackson Blvd'/><city value='San Jose'/><county value='Santa Clara'/><state value='CA'/><zip value='95111'/><phone1 value='408-752-3500'/><phone2 value='408-813-1105'/><email value='leota@hotmail.com'/><web value='http:&#x2F;&#x2F;www.commercialpress.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Sage'/><last_name value='Wieser'/><company_name value='Truhlar And Truhlar Attys'/><address value='5 Boston Ave #88'/><city value='Sioux Falls'/><county value='Minnehaha'/><state value='SD'/><zip value='57105'/><phone1 value='605-414-2147'/><phone2 value='605-794-4895'/><email value='sage_wieser@cox.net'/><web value='http:&#x2F;&#x2F;www.truhlarandtruhlarattys.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Kris'/><last_name value='Marrier'/><company_name value='King, Christopher A Esq'/><address value='228 Runamuck Pl #2808'/><city value='Baltimore'/><county value='Baltimore City'/><state value='MD'/><zip value='21224'/><phone1 value='410-655-8723'/><phone2 value='410-804-4694'/><email value='kris@gmail.com'/><web value='http:&#x2F;&#x2F;www.kingchristopheraesq.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Minna'/><last_name value='Amigon'/><company_name value='Dorl, James J Esq'/><address value='2371 Jerrold Ave'/><city value='Kulpsville'/><county value='Montgomery'/><state value='PA'/><zip value='19443'/><phone1 value='215-874-1229'/><phone2 value='215-422-8694'/><email value='minna_amigon@yahoo.com'/><web value='http:&#x2F;&#x2F;www.dorljamesjesq.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Abel'/><last_name value='Maclead'/><company_name value='Rangoni Of Florence'/><address value='37275 St  Rt 17m M'/><city value='Middle Island'/><county value='Suffolk'/><state value='NY'/><zip value='11953'/><phone1 value='631-335-3414'/><phone2 value='631-677-3675'/><email value='amaclead@gmail.com'/><web value='http:&#x2F;&#x2F;www.rangoniofflorence.com'/></CCCEA17>",
              "<CCCEA17><first_name value='Kiley'/><last_name value='Caldarera'/><company_name value='Feiner Bros'/><address value='25 E 75th St #69'/><city value='Los Angeles'/><county value='Los Angeles'/><state value='CA'/><zip value='90034'/><phone1 value='310-498-5651'/><phone2 value='310-254-3084'/><email value='kiley.caldarera@aol.com'/><web value='http:&#x2F;&#x2F;www.feinerbros.com'/></CCCEA17>"];

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  var responseBody = '',
      root = req.body[_.keys(req.body)[0]];

  console.log( 'TASK[' + root.$.task + ']' );

  res.set( 'Content-Type', 'application/xml' );

  if ( root.$.action === 'fetch' ) {
    if ( root.target[0].$.value === 'all' ) {
      responseBody += '<vector>';
      responseBody = _.reduce( data, function ( memo, item ) {
        return memo += '<data>' + item + '</data>';
      }, responseBody );
      responseBody += '</vector>';
    } else if ( root.target[0].$.value === '0' ) {
      responseBody = data[0];
    }
  } else if ( root.$.action === 'sync' ) {
    console.log( JSON.stringify(root) );
    responseBody = "<response result='1'/>";
  } else if ( root.$.action === 'complex' ) {
    console.log( 'complex' );
    responseBody = "<msg1>" +
                  "  <node1 value='바나나' attr1='가' attr2='나'/>" +
                  "  <node2 value='딸기' attr1='다' />" +
                  "  <node3 value=''/>" +
                  "  <header>" +
                  "    <header1 value='1'/>" +
                  "    <header2 value='2'/>" +
                  "  </header>" +
                  "  <body>" +
                  "    <body1 value='3'/>" +
                  "    <body2 value='4'/>" +
                  "    <rec1 type='java.util.Vector'>" +
                  "      <vector result='2'>" +
                  "        <data vectorkey='0'>" +
                  "          <CCCE017>" +
                  "            <nContactType value='1'/>" +
                  "            <nCallType value='0'/>" +
                  "          </CCCE017>" +
                  "        </data>" +
                  "        <data vectorkey='1'>" +
                  "          <CCCE017>" +
                  "            <nContactType value='1'/>" +
                  "            <nCallType value='0'/>" +
                  "          </CCCE017>" +
                  "        </data>" +
                  "      </vector>" +
                  "    </rec1>" +
                  "  </body>" +
                  "  <footer value='키위'/>" +
                  "</msg1>";
  } else {
    responseBody = "<response/>";
  }
  res.send(responseBody);
});

module.exports = router;

