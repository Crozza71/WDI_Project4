angular
  .module('runners')
  .factory('Comment', Comment);

Comment.$inject = ['$resource'];
function Comment($resource){
  return $resource(
    'http://localhost:3000/comments/:id', {id: '@_id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
