/* basic form page handling and uploading */
var form = require('formidable');
var http = require('http');
var fs = require('fs');

var port = 8080;
var ip = '127.0.0.1';

var server = http.createServer(function(req,res){
  /*  STEP 2: Parse the upload , the file will be uploaded and placed in a temporary file*/
  if ( req.url == '/fileupload'){
      var req_form = new form.IncomingForm();
      req_form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      /* STEP 3: moving the file to folder in computer */
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/jonathanphouminh/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');      /* this doesn't work? */ 
        res.end();
      });
    });
  }
  else{
    /* STEP 1: creates form page on the client */
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');   // so im assuming that when the user hits submit, it sends another request to the server
    res.write('</form>');
    res.end();              // end the response
  }

});

server.listen(port,ip);
console.log(`Server active. Port: ${port} IP: ${ip}`);
