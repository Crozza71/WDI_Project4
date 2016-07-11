angular
  .module('runners')
  .factory('run', run);

User.$inject = ['$resource'];

function run($resource){

  return $resource(
    'http://localhost:3000/run/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
