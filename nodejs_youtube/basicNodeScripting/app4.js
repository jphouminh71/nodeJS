/* this file shows us basic handling of events in node.js */
// getting the module
var events = require('events');
var eventEmitter = new events.EventEmitter();
var clicked = new events.EventEmitter();      // created a new event that will happen when we click


// event handler
var myEventHandler = function(){
  console.log("EVENT TRIGGERED");
};

// creating the event trigger
eventEmitter.on('scream',myEventHandler);

// emmitting the event
eventEmitter.emit('scream');
