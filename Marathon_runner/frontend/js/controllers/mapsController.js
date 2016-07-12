angular
  .module('runners')
  .controller('MapsController' , MapsController);

function MapsController(uiGmapGoogleMapApi, run) {
    var self = this;

    self.addRunInput = null;   
    

    self.waypoints = [];

    self.addwaypoint = addwaypoint;


    function addwaypoint() {
      self.waypoints.push(self.addRunInput)

      console.log(self.waypoints);

      self.addRunInput = null;

      var last = self.waypoints.length -1
      console.log("ORIGIN", self.waypoints[0])
      console.log("DESTINATION",self.waypoints[last])
    }


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
        // self.run = run.get({id: "578500f65043109f325f22e3"} , function(){
        //     // create the first set
        //     self.showDirections();
        // });

        self.run = new run();


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

      this.addWaypoint = function() {

          // if new
          if(!self.run.destination) {

              self.run.origin = self.run.destination = self.map.control.getGMap().getCenter();

          } else {

            this.run.waypoints.push({
              location: self.run.destination
            });

          }

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