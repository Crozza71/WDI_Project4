angular
  .module('runners')
  .controller('MapsController' , MapsController);

function MapsController(uiGmapGoogleMapApi, run) {
    var self = this;


// ADD RUN
//********
    self.newRun = null;  

    self.newTest = {};

    self.addRun = function(){

        console.log('addRun');
        run.save({run: self.newRun}, function(response) {

          console.log(response);
         
        });
        

        }

//********

    // initial map data
    self.map = {
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
      
      // wait for google maps to be loaded
      uiGmapGoogleMapApi.then(function(maps) {
        // get the data for the run
        self.run = {
          origin: { 
              lat: 51.236220, 
              lng: -0.570409 
          },
          destination: { 
              lat: 51.3265140, 
              lng: -0.2596870 
          },
          waypoints: [
            {
              location:{ 
                lat: 51.3265140, 
                lng: -0.2596870 
              }
            }
          ]
        };
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
        // create the first set
        self.showDirections();
      });
      this.addWaypoint = function() {
          this.run.waypoints.push({
            location: self.run.destination
          });
          this.showDirections();
      }
      this.showDirections = function() {
          
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
      return self;
}