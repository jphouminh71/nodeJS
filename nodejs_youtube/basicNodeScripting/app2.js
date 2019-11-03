/* serving the client request based on URL path */
var http = require('http');
var fs = require('fs');
var url = require('url');
var utf8 = require('utf8');

let server = http.createServer(function(req,res){
  if(req.url === '/favicon.ico') {    // known bug in google chrome of sending extra request to this, fixed it by adding a line in html code
        console.log('Favicon was requested');
  }
  var filename = '';
  var parse = '';
  parse = url.parse(req.url, true);    // grabs us the path name
  console.log(`PATHNAME ${parse.pathname}`);
  filename = "." + parse.pathname + ".html";    // use this path name to open and read in a file
  console.log(`FILENAME: ${filename}`);  // if the url has /winter we have ./winter.html <- this is our file name to read
  fs.readFile(filename, function(err,data){
    if (err){
      throw err;
    }
    res.writeHead(200,{'Content-type': 'text/html'});
    res.write(data);
    res.end();
  });
  //res.end();    // if we had the code here it would throw an error because it would execute before the write is finished.

});

var port = 8080;
var ip = '127.0.01';
server.listen(port,ip);   /* listens on port 8080 at that ip*/
console.log(`Now listening on port ${port} at ip: ${ip}`);
