//Problem we need a simple way to look at a user's badge count abd Javascript points from a web browser
//Solution use node.js to perform the profile look ups and ser our template via https.
var  http = require('http');
var router = require('./router.js');


// create a web server
//homeRoute handler gets same request and respnse that //server receives
http.createServer(function (request, response)  {
 router.home(request, response);
 router.user(request, response);
}).listen(3000);
console.log('Server is running at http://localhost:3000');