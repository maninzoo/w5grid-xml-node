# w5grid-xml-node
This tutorial shows you how the [W5Grid](https://w5.io) communicate with Server-side in XML way.

We won't be using DB since this tutorial is focused on the data type that being used in Font-End and Servier-Side communication. 

[Express.js](http://expressjs.com) is used for Server-Side.  

Since W5Grid is using JSON, the data has to be converted to XML before data being transmitted to the server. Also the server converts it data, XML, to JSON.  

For performance purpose, we recommend data conversion being done in the Server-Side.

From the Server-Side use `express-xml-bodyparser` to parse the requested XML.  

## Installation
Use npm registry to install.  

```
$ npm install w5grid-xml-node
```

Install `w5` and `x2js` with `Bower`.  

'x2js' is used for the conversion of XML and JSON.  

```
$ bower install w5
$ bower install x2js
```

In this tutorial, the components installed with 'bower' goest to `components` folder by `.bowerrc` configuration, but the defualt directory is `bower_components.  

In case of need, edit `express.static` part from `/app.js`.  

```
app.use(express.static(path.join(__dirname, 'components')));
```

## Execute
The project is composed with the basic [template](http://expressjs.com/starter/generator.html) created by Express 4.  

Therefor `bin/www` is the entry point.  

The server listens at port `3000`. Including bodyParser, the configurations and routings are defined in app.js.  

Execute Express in the working directory.  

```
$ node bin/www
```

## Test
`Promise` is used for the sample that async with Server-Side.  

Browser limitation exists when using browser Native Promise object without external library.  
Check [Can I use](http://caniuse.com/promises) for the supported browers.  

The sample program is located in `public/` directory.  

`public` and `components` directory are defined as static path, so that the Front-End access to the sub-directory.  

On the browser, type the following URL to see the test result.  

```
http://localhost:3000/fetch.xml.html
http://localhost:3000/sync.xml.html
```

Use below samples to test ProWorks by Inswave.  

```
http://localhost:3000/fetch.xml.proworks.html
http://localhost:3000/sync.xml.proworks.html
```
For more detailed information, please check [W5Grid](#) guides.
