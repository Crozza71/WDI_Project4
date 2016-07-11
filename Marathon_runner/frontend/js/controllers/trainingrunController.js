angular
  .module('runners')
  .controller('TrainingrunController', TrainingrunController);

TrainingrunController.$inject = ['Trainingrun', '$state', '$location'];

function TrainingrunController(Trainingrun, $state, $location){

  var self = this;
  self.newTrainingrun = null;
  self.all = null;
  this.getTrainingrun = getTrainingrun;

getTrainingrun();

function getTrainingrun(){
  Trainingrun.query(function(data){
    self.all = data;
  });

}

this.addTrainingrun = function(){
    console.log("adding Trainingrun" + self.all)
    Trainingrun.save(self.TrainingrunRace, function(response){
      console.log("YOOO" + response)
      console.log(response)
      console.log(self.newTrainingrun)
        self.all.push(self.newTrainingrun);
        self.newProject = {}
    });

    
  }

  this.showTrainingrun = function(trainingrun) {
    this.trainingrunShow = trainingrun;
  }

  function editTrainingrun(trainingrun){
      self.editedTrainingrun = trainingrun;  
  }

  function updateTrainingrun(){
    index = self.all.indexOf(self.editedProject)
    $http.put('http://localhost:3000/trainingrun/' + self.editedTrainingrun._id, {project: this.editedTrainingrun}).then(function(response){
      self.all[index] = self.editedTrainingrun;
    })
    }

    function deleteProject(race){
          $http.delete('http://localhost:3000/trainingrun/' + trainingrun._id).then(function(response){
            index = self.all.indexOf(trainingrun)
            self.all.splice(index, 1)
          })
      }


}
