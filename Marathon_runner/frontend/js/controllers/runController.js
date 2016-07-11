angular
  .module('runners')
  .controller('runController', runController);

runController.$inject = ['run', '$state', '$location'];

function runController(run, $state, $location){

  var self = this;
  self.newrun = null;
  self.all = null;
  this.getrun = getrun;

getrun();

function getrun(){
  run.query(function(data){
    self.all = data;
  });

}

this.addrun = function(){
    console.log("adding run" + self.all)
    run.save(self.run, function(response){
      console.log("YOOO" + response)
      console.log(response)
      console.log(self.newrun)
        self.all.push(self.newrun);
        self.newProject = {}
    });

    
  }

  this.showrun = function(run) {
    this.runShow = run;
  }

  function editrun(run){
      self.editedrun = run;  
  }

  function updaterun(){
    index = self.all.indexOf(self.editedProject)
    $http.put('http://localhost:3000/run/' + self.editedrun._id, {project: this.editedrun}).then(function(response){
      self.all[index] = self.editedrun;
    })
    }

    function deleteProject(run){
          $http.delete('http://localhost:3000/run/' + run._id).then(function(response){
            index = self.all.indexOf(run)
            self.all.splice(index, 1)
          })
      }


}
