angular
  .module('runners')
  .factory('Run', Run);

Run.$inject = ['$resource'];
function Run($resource){
  return $resource(
    'http://localhost:3000/run/:id', {id: '@_id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
