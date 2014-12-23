var module = angular.module('rp');

module.service('$vaultClient', ['$rootScope', function($scope)
{
    
  this.vaultClient = new ripple.VaultClient();
    
}]);