angular
  .module('runners')
  .factory('Trainingrun', Trainingrun);

User.$inject = ['$resource'];

function Trainingrun($resource){

  return $resource(
    'http://localhost:3000/trainingrun/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
