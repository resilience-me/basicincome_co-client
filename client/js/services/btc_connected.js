var module = angular.module('rp');

module.service('$connection_status', ['$rootScope', function($scope)
{
 
 
this.connect = function() {
    $scope.btc_connected = true
}

this.disconnect = function() {
    $scope.btc_connected = false
}


this.check = function(){

if(typeof $scope.userBlob.data.flat_btc_basicincome_co !== "undefined"){
$scope.btc_connected = true
}
else $scope.btc_connected = false

}

    
}]);

