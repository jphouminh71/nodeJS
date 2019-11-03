/* this will hold the model and schema of ninjas */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create geolocation Schema
const GeoSchema = new Schema({
  type:{          // type of coordinate
    type: String,     // type of the type of coordinate
    default: "Point",

  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})
//create ninja Schema & model
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rank: {
    type: String
  },
  available:{
    type: Boolean,
    default: false
  },

  // add in geo location
  geometry: GeoSchema

});

// creating a model with the collection name 'ninja', they will be structured with the NinjaSchema
const Ninja = mongoose.model('ninja', NinjaSchema);

// exporting the module so that other files can use it
module.exports = Ninja ;
