const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Sightings.prototype.bindEvents = function () {
  PubSub.subscribe('SightingView:sighting-delete-clicked', (evt) => {
    this.deleteSighting(evt.detail);
  });
  // subscribe SightingFormView:sighting-submitted
  PubSub.subscribe("SightingFormView:sighting-submitted", (evt) => {
    // call this.postSighting pass along the info
    this.postSighting(evt.detail);
  })
};

Sightings.prototype.getData = function () {
  this.request.get()
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

// passed in sighting
Sightings.prototype.postSighting = function(sighting){
  // make a post request to the api to save the data
  this.request.post(sighting)
    .then((sightings) =>{
      // publish the response which will be the full list of sightings 'Sightings:data-loaded'
      PubSub.publish('Sightings:data-loaded', sightings)
    })
    .catch(console.error);
}

Sightings.prototype.deleteSighting = function (sightingId) {
  this.request.delete(sightingId)
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

module.exports = Sightings;
