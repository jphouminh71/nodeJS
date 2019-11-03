var http = require('http');   // this imports the package http into the variable
var getDate = require('./dateMod.js');    // non built in modules need to have a file path specified
var url = require('url');
var fs = require('fs');
/* This was an example of includeing your own module
var date = getDate.myDateTime();
console.log(date);
*/

/*        THIS CREATES A LOCAL SERVER ON PORT 8080 */
var server = http.createServer(function(req,res){
  if(req.url === '/favicon.ico') {    // known bug in google chrome of sending extra request to this, fixed it by adding a line in html code
        console.log('Favicon was requested');
  }

  /* fs.appendFile(), same as in C++ if we append a file that doesn't exist it will automatically do it */
  fs.appendFile('practice_appendfile.txt', 'Hello World', function(err){    // problem here, why is there two separate requests after refresh?
  if(err){
    throw err;
  }
  console.log('APPEND: file saved! Finished the append.');
  });

  /* fs. writeFile(), same as append BUT this will overwrite everything in the file */
  fs.writeFile('practice_appendfile.txt','I just replaced "hello world"', function(err){
    if (err){
      throw err;
    }
    console.log('WRITE: File re-written, finished the write.');
  });

  /* fs.rename(), rename the specified file */
  fs.rename('practice_appendfile.txt','RENAME.txt',function(err){
    if (err) {
      throw err;
    }
    console.log("RENAME: file renamed.");

  });
  /* fs. READ MODULE and WRITE MODULE */
  fs.readFile('demo.html',function(err,data){
    if (err){
      throw err;
    }
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(data);
    res.end();
  });
  console.log('READ: finished the read');

  /* fs.unlink(), essentially this is just deleting a file */
  fs.unlink('RENAME.txt',function(err){
    if (err){
      throw err;
    }
    console.log('DELETE: File deleted.');
  });


  /*        Basic server response stuff that you can do
  res.writeHead(200,{'Content-Type': 'text/html'});   // res is the response variable from the server
  //http://localhost:8080/?year=2017&month=July&day=monday
  var q = url.parse(req.url, true).query;
  var text = q.year + " " + q.month + " " + q.day;
  res.write(text);
  //res.write(req.url);     // this gives you the URL part that comes after the port id
  //res.write("The date and time is currently: " + getDate.myDateTime() + "\n");
  res.end('Hello World!');
  */
});

server.listen(8080,'127.0.0.1');    // make this server listen on port 3000, the port is the local host
console.log('server now listening at port 8080 , ip 127.0.0.1');

// now our machine is acting as a server !
