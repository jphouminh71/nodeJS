const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
// set up the express app
const app = express();


//connect to mongodb, cluster is called 'NinjaUber'
mongoose.connect('mongodb+srv://test:test@ninjauber-mjnvh.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true}).catch(error => handleError(error));


// parses json input
app.use(bodyParser.json());


// initialize routes
app.use('/api', routes);

// error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message}); // send the error message back to the client     
});

// listen for request at port 8000, it either listens to the setup variable (heroku) otherwise port 8000
app.listen(process.env.port || 8000, function(){
  console.log('Now listening for requests');
});
