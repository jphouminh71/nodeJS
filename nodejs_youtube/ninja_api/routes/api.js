const express = require('express');
const Ninja = require('../models/ninjas');

const router = express.Router();

// for this get, we want to hand over to the client a list of ninjas from the database
router.get('/ninjas', function(req,res,next){
  // Ninja.find({}).then(function(ninjas){
  //   res.send(ninjas);
  // });
  Ninja.aggregate()
  .near({
    near: {
      type: "Point",
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    maxDistance: 300000, // 300 KM
    spherical: true,
    distanceField: "distance"
  })
  .then(ninjas => {
    console.log(ninjas);
    if (ninjas) {
      if (ninjas.length === 0)
        return res.send({
          message:
            "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)."
        });
      return res.send(ninjas);
    }
  }).catch(next);
});

// take in data from client and add new ninja to the database
router.post('/ninjas', function(req,res,next){
  Ninja.create(req.body).then(function(ninja){  // creates a new instance of the object locally and saves it to the database
    console.log(`Successfully stored ${req.body.name} into the mongodb`);
    res.send(ninja);
  }).catch(next);
});

// update a ninja in the database
router.put('/ninjas/:id', function(req,res,next){
  Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then(function(ninja){
    res.send(ninja);
  }).catch(next);
});

// remove a ninja from our database
router.delete('/ninjas/:id', function(req,res,next){
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(){
    Ninja.findOne({_id: req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  }).catch(next);
});

module.exports = router;    // export the router so that the entry point 'app.js' can utilize the routes
