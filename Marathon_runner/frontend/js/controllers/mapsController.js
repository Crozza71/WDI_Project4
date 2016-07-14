angular
  .module('runners')
  .controller('MapsController' , MapsController);

MapsController.$inject = ['uiGmapGoogleMapApi', 'Run', '$state', '$stateParams']
function MapsController(uiGmapGoogleMapApi, Run, $state, $stateParams) {
  var self = this;

  self.newRun      = null; 
  self.run         = null; 
  self.waypoints   = [];

  var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"saturation":"-65"},{"lightness":"45"},{"gamma":"1.78"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"saturation":"-33"},{"lightness":"22"},{"gamma":"2.08"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"gamma":"2.08"},{"hue":"#ffa200"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"visibility":"simplified"},{"saturation":"-55"},{"lightness":"-2"},{"gamma":"1.88"},{"hue":"#ffab00"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#bbd9e5"},{"visibility":"simplified"}]}];


  
  self.map         = {
    center: { 
      latitude: 51.5074,
      longitude: -0.1278
    }, 
    zoom: 10, 
    control:{},
    options: {
      styles: styles
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