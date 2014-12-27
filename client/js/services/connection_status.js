var module = angular.module('rp');

module.service('$connection_status', ['$rootScope', function($scope)
{
 
 
this.connect = function() {
    $scope.connected = true
}

this.disconnect = function() {
    $scope.connected = false
}


this.check = function(){

if(typeof $scope.userBlob.data.flat_btc_basicincome_co !== "undefined"){
$scope.connected = true
}
else $scope.connected = false

}

    
}]);

