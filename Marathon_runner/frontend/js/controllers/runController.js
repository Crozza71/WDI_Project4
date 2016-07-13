angular
  .module('runners')
  .controller('runController', runController);

runController.$inject = ['Run', '$state', '$location'];

function runController(Run, $state, $location){

  var self = this;
  self.newrun = null;
  self.all = null;

  self.getrun  = getrun;
  self.addrun  = addrun;


  function getrun(){
    Run.query(function(data){
      self.all = data;
    });
  }

  function addrun(){
    console.log("adding run" + self.all)
    Run.save(self.run, function(response){
      console.log("YOOO" + response)
      console.log(response)
      console.log(self.newrun)
      self.all.push(self.newrun);
      self.newrun = {}
    }); 
  }

  // function showrun(run) {
  //   this.runShow = run;
  // }

  // function editrun(run){
  //     self.editedrun = run;  
  // }

  // function updaterun(){
  //   index = self.all.indexOf(self.editedProject)
  //   $http.put('http://localhost:3000/run/' + self.editedrun._id, {project: this.editedrun}).then(function(response){
  //     self.all[index] = self.editedrun;
  //   })
  // }

  // function deleteProject(run){
  //   $http.delete('http://localhost:3000/run/' + run._id).then(function(response){
  //     index = self.all.indexOf(run)
  //     self.all.splice(index, 1)
  //   })
  // }

  getrun();
}
