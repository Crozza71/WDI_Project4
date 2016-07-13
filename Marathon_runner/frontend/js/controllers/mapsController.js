angular
  .module('runners')
  .controller('MapsController' , MapsController);

MapsController.$inject = ['uiGmapGoogleMapApi', 'Run', '$state', '$stateParams']
function MapsController(uiGmapGoogleMapApi, Run, $state, $stateParams) {
  var self = this;

  self.name        = "Fyll";
  self.newRun      = null; 
  self.run         = null; 
  self.waypoints   = [];
  self.map         = {
    center: { 
      latitude: 51.3265140,
      longitude: -0.2596870
    }, 
    zoom: 14, 
    control:{},
    options: {
      scrollwheel: false
    }
  };
   

  self.addRun         = addRun;
  self.addWaypoint    = addWaypoint;
  self.showDirections = showDirections;




  function addRun(){
    console.log("clicked");
    console.log("RUN", self.run)

    Run.save({ run: self.run }, function(response) {
      console.log(response);
      self.run = null;
    })
  }

  function addWaypoint() {
    // if new
    if(!self.run.destination) {
      self.run.origin = self.run.destination = self.map.control.getGMap().getCenter();
    } else {
      this.run.waypoints.push({
      location: self.run.destination
      });
    }
    
    self.showDirections();
  }

  function showDirections() {
    self.directionsService.route({
      origin: self.run.origin,
      destination: self.run.destination,
      waypoints: self.run.waypoints,
      travelMode: self.maps.TravelMode.WALKING,
      avoidTolls: true
    }, function (response, status) {
      if (status === self.maps.DirectionsStatus.OK) {
        self.directionsDisplay.setMap(self.map.control.getGMap());
        self.directionsDisplay.setDirections(response);
      } else {
        alert('Google route unsuccesfull!');
      }
    });
  }

  // wait for google maps to be loaded
  uiGmapGoogleMapApi.then(function(maps) {

    if($state.params.id) {
      Run.get({id: $stateParams.id } , function(run){
        self.run = run;
        self.showDirections();
      });
    } else {
      self.run = new Run();
    }

    // instantiate google map objects for directions
    self.directionsDisplay = new maps.DirectionsRenderer({
      draggable: true
    });
    self.directionsService = new maps.DirectionsService();
    self.maps = maps;
    // fake two way binding
    self.directionsDisplay.addListener('directions_changed', function() {
      self.run.waypoints = self.directionsDisplay.getDirections().request.waypoints;
      self.run.origin = self.directionsDisplay.getDirections().request.origin;
      self.run.destination = self.directionsDisplay.getDirections().request.destination;
    });       
  });
}