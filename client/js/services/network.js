var module = angular.module('rp');

module.service('$network', ['$rootScope', function($scope)
{
    
  this.remote = new ripple.Remote({
  // see the API Reference for available options
  servers: [ 'wss://s1.ripple.com:443' ]
}).connect();
       
    
}]);

