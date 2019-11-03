/* this server will serve as a basic guide to importing a package that lets us use caps converter */
// npm i upper-case
var upperCase = require('upper-case');
var http = require('http');   // this imports the package http into the variable
var url = require('url');
var fs = require('fs');

var port = 3000;
var ip = "127.0.0.01";

var server;
var testString = 'hello world!!!';
var upped;

server = http.createServer(function(req,res){
  res.write(testString);
  res.write('\n');
  upped = upperCase(testString);
  res.write(upped);
  res.end();
});

server.listen(port, ip);
console.log('server active.');
