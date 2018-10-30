const PubSub = require('../helpers/pub_sub.js')

const SightingFormView = function (form) {
  this.form = form;
};

SightingFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

SightingFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  // Data from event
  // >> createSightings method to return JSON
  const newSighting = this.createSighting(evt.target);
  // publish 'SightingFormView:sighting-submitted'
  PubSub.publish("SightingFormView:sighting-submitted", newSighting);
  // console.log(newSighting);
  evt.target.reset();
};

// createSightings pass in form......
SightingFormView.prototype.createSighting = function (form) {
  // create const for new sighting
  const newSighting = {
    // "species": "Yellow Wagtail",
    species: form.species.value,
    // "location": "Sutherland",
    location: form.location.value,
    // "date": "2017-06-01"
    date: form.date.value
  };

  return newSighting;

};

module.exports = SightingFormView;
