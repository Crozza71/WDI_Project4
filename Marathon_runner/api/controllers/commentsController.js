// var Comments = require('../models/comment');

// // get all comments
// function commentsAll(request, response) {
//   Comments.find(function(error, comments) {
//     if(error) response.json({message: 'Could not find any comments'});

//     response.json({comments: comments});
//   });

// }

// function commentsCreate(request, response) {
//   var comments = new comment(request.body);

//   comment.save(function(error) {
//     if(error) response.json({messsage: 'Could not create a comment'});

//     response.json({comment: comment});
//   });


// module.exports = {
//   commentsAll:  commentsAll,
//   commentsCreate: commentsCreate
  
// };
