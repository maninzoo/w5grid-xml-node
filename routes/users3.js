var express = require('express');
var router = express.Router();
var _ = require('underscore');

var data = ["<userList><id>0</id><first_name>James</first_name><last_name>Butt</last_name><company_name>Benton, John B Jr</company_name><address>6649 N Blue Gum St</address><city>New Orleans</city><county>Orleans</county><state>LA</state><zip>70116</zip><phone1>504-621-8927</phone1><phone2>504-845-1427</phone2><email>jbutt@gmail.com</email><web>http:&#x2F;&#x2F;swww.bentonjohnbjr.com</web></userList>",
            "<userList><id>1</id><first_name>Art</first_name><last_name>Venere</last_name><company_name>Chemel, James L Cpa</company_name><address>8 W Cerritos Ave #54</address><city>Bridgeport</city><county>Gloucester</county><state>NJ</state><zip>8014</zip><phone1>856-636-8749</phone1><phone2>856-264-4130</phone2><email>art@venere.org</email><web>http:&#x2F;&#x2F;www.chemeljameslcpa.com</web></userList>",
            "<userList><id>2</id><first_name>Lenna</first_name><last_name>Paprocki</last_name><company_name>Feltz Printing Service</company_name><address>639 Main St</address><city>Anchorage</city><county>Anchorage</county><state>AK</state><zip>99501</zip><phone1>907-385-4412</phone1><phone2>907-921-2010</phone2><email>lpaprocki@hotmail.com</email><web>http:&#x2F;&#x2F;www.feltzprintingservice.com</web></userList>",
            "<userList><id>3</id><first_name>Donette</first_name><last_name>Foller</last_name><company_name>Printing Dimensions</company_name><address>34 Center St</address><city>Hamilton</city><county>Butler</county><state>OH</state><zip>45011</zip><phone1>513-570-1893</phone1><phone2>513-549-4561</phone2><email>donette.foller@cox.net</email><web>http:&#x2F;&#x2F;www.printingdimensions.com</web></userList>",
            "<userList><id>4</id><first_name>Simona</first_name><last_name>Morasca</last_name><company_name>Chapman, Ross E Esq</company_name><address>3 Mcauley Dr</address><city>Ashland</city><county>Ashland</county><state>OH</state><zip>44805</zip><phone1>419-503-2484</phone1><phone2>419-800-6759</phone2><email>simona@morasca.com</email><web>http:&#x2F;&#x2F;www.chapmanrosseesq.com</web></userList>",
            "<userList><id>5</id><first_name>Mitsue</first_name><last_name>Tollner</last_name><company_name>Morlong Associates</company_name><address>7 Eads St</address><city>Chicago</city><county>Cook</county><state>IL</state><zip>60632</zip><phone1>773-573-6914</phone1><phone2>773-924-8565</phone2><email>mitsue_tollner@yahoo.com</email><web>http:&#x2F;&#x2F;www.morlongassociates.com</web></userList>",
            "<userList><id>6</id><first_name>Leota</first_name><last_name>Dilliard</last_name><company_name>Commercial Press</company_name><address>7 W Jackson Blvd</address><city>San Jose</city><county>Santa Clara</county><state>CA</state><zip>95111</zip><phone1>408-752-3500</phone1><phone2>408-813-1105</phone2><email>leota@hotmail.com</email><web>http:&#x2F;&#x2F;www.commercialpress.com</web></userList>",
            "<userList><id>7</id><first_name>Sage</first_name><last_name>Wieser</last_name><company_name>Truhlar And Truhlar Attys</company_name><address>5 Boston Ave #88</address><city>Sioux Falls</city><county>Minnehaha</county><state>SD</state><zip>57105</zip><phone1>605-414-2147</phone1><phone2>605-794-4895</phone2><email>sage_wieser@cox.net</email><web>http:&#x2F;&#x2F;www.truhlarandtruhlarattys.com</web></userList>",
            "<userList><id>8</id><first_name>Kris</first_name><last_name>Marrier</last_name><company_name>King, Christopher A Esq</company_name><address>228 Runamuck Pl #2808</address><city>Baltimore</city><county>Baltimore City</county><state>MD</state><zip>21224</zip><phone1>410-655-8723</phone1><phone2>410-804-4694</phone2><email>kris@gmail.com</email><web>http:&#x2F;&#x2F;www.kingchristopheraesq.com</web></userList>",
            "<userList><id>9</id><first_name>Minna</first_name><last_name>Amigon</last_name><company_name>Dorl, James J Esq</company_name><address>2371 Jerrold Ave</address><city>Kulpsville</city><county>Montgomery</county><state>PA</state><zip>19443</zip><phone1>215-874-1229</phone1><phone2>215-422-8694</phone2><email>minna_amigon@yahoo.com</email><web>http:&#x2F;&#x2F;www.dorljamesjesq.com</web></userList>",
            "<userList><id>10</id><first_name>Abel</first_name><last_name>Maclead</last_name><company_name>Rangoni Of Florence</company_name><address>37275 St  Rt 17m M</address><city>Middle Island</city><county>Suffolk</county><state>NY</state><zip>11953</zip><phone1>631-335-3414</phone1><phone2>631-677-3675</phone2><email>amaclead@gmail.com</email><web>http:&#x2F;&#x2F;www.rangoniofflorence.com</web></userList>",
            "<userList><id>11</id><first_name>Kiley</first_name><last_name>Caldarera</last_name><company_name>Feiner Bros</company_name><address>25 E 75th St #69'</address><city>Los Angeles</city><county>Los Angeles</county><state>CA</state><zip>90034</zip><phone1>310-498-5651</phone1><phone2>310-254-3084</phone2><email>kiley.caldarera@aol.com</email><web>http:&#x2F;&#x2F;www.feinerbros.com</web></userList>"];

var setXML = function( data ) {
  return "<userList><id>" + data.id[0] + "</id>" +
        "<first_name>" + data.first_name[0] + "</first_name>" +
        "<last_name>" + data.last_name[0] + "</last_name>" +
        "<company_name>" + data.company_name[0] + "</company_name>" +
        "<address>" + data.address[0] + "</address>" +
        "<city>" + data.city[0] + "</city>" +
        "<county>" + data.county[0] + "</county>" +
        "<state>" + data.state[0] + "</state>" +
        "<zip>" + data.zip[0] + "</zip>" +
        "<phone1>" + data.phone1[0] + "</phone1>" +
        "<phone2>" + data.phone2[0] + "</phone2>" +
        "<email>" + data.email[0] + "</email>" +
        "<web>" + data.web[0].replace( /\//g, '&#x2F;' ) + "</web>" +
        "</userList>";
};

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  var responseBody = '',
      body = req.body,
      root = _.keys(body)[0];

  console.log( 'TASK[' + root + ']' );

  res.set( 'Content-Type', 'application/xml' );

  if ( root === 'fetch' ) {
    if ( body[root].target[0] === 'all' ) {
      responseBody += '<response>';
      responseBody = _.reduce( data, function ( memo, item ) {
        return memo += item;
      }, responseBody );
      responseBody += '</response>';
    } else {
      responseBody = data[body[root].target[0]];
    }
  } else if ( root === 'update' ) {
    data[body[root].id[0]] = setXML(body[root]);
    responseBody = "<result>1</result>";
  } else if ( root === 'create' ) {
    body[root].id = [];
    body[root].id.push(data.length);
    data.push( setXML(body[root]) );
    responseBody = data[data.length-1];
  } else if ( root === 'delete' ) {
    data.splice( body[root].target[0], 1 );
    responseBody = "<result>1</result>";
  } else if ( root === 'sync' ) {
    console.log( JSON.stringify(body) );
    responseBody = "<response>" +
                  "<create>" + ( _.isObject(body[root].createList[0]) ? body[root].createList.length : 0 ) + "</create>" +
                  "<update>" + ( _.isObject(body[root].updateList[0]) ? body[root].updateList.length : 0 ) + "</update>" +
                  "<delete>" + ( _.isObject(body[root].deleteList[0]) ? body[root].deleteList.length : 0 ) + "</delete>" +
                  "</response>";
  } else {
    responseBody = "<response/>";
  }
  res.send(responseBody);
});

module.exports = router;

