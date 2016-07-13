// angular
//   .module('runners')
//   .controller('CommentController', CommentController);

//   CommentController.$inject = ['User', 'Run','Comment']
//   function CommentController(User, Run, Comment){

    
//     var self = this;
//     self.newcomment = null;
//     self.all = null;

//     self.getrun  = getrun;
//     self.addrun  = addrun;


//     function getrun(){
//       Run.query(function(data){
//         self.all = data;
//       });
//     }

//     function addrun(){
//       console.log("adding run" + self.all)
//       Run.save(self.run, function(response){
//         console.log("YOOO" + response)
//         console.log(response)
//         console.log(self.newrun)
//         self.all.push(self.newrun);
//         self.newrun = {}
//       }); 
//     }


//   }