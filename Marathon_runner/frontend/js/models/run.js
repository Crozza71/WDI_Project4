angular
  .module('runners')
  .factory('run', run);

run.$inject = ['$resource'];

function run($resource){

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
