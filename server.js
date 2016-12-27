var  http = require('http');
var router = require('./router.js');

// entry point to to application
// http.createServer Returns a new instance of http.Server.which inherits from net server
// essentilly it is a class is used to create a TCP or local server with events.
// It is a EventEmitter: Essentially an object  
// periodically emit named events that
// call cause function objects to be called (listeners)
// in this case listening 
// after I bound the server with .listen(3000)
// which is this pattern server.listen(handle[, backlog][, callback])
// in this case only first argument is passed (handle) 
// which tells the server to accept connections on port 3000
// enclosed within our server is two routes  
// home and user which are defined in router.js 
// first route executed is the home route
// An IncomingMessage object is created by http.Server or 
// and passed as the first argument to the 'request' and 'response' event respectively. 
// It may be used to access response status, headers and data.
// lastly I wrote a message to the console that alerts theat that the server is running with 
// on which port




http.createServer(function (request, response)  {
 router.home(request, response);
 router.user(request, response);
}).listen(3000);
console.log('Server is running at http://localhost:3000');
