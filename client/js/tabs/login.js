var module = angular.module('rp');




  module.controller('BlobCtrl', ['$rootScope', '$location', '$network', '$vaultClient',  'usSpinnerService', 'WebSocket', '$window',
    function ($scope, $location, $network, $vaultClient, usSpinnerService, WebSocket, $window)
  {
   
// iframe width/height video on the login page

var w = angular.element($window);
w.bind('resize', function () {
video_width()
})
function video_width(){
var h = document.getElementById('introduction_movie').offsetWidth;
document.getElementById('introduction_movie').style.height = h*0.5625
}
video_width()



 $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function(){
        usSpinnerService.stop('spinner-1');
    }


 $scope.submit = function() {
        
     login(this.username,  this.password)

}



function login(username, password){
//$vaultClient.vaultClient.loginAndUnlock(username, password,  userBlob)//not sure what 3rd argument, device_id, is (vaultclient.js line 138)
$vaultClient.vaultClient.login(username, password, "basicincome.co",userBlob);


function userBlob(err, data) {
    
    console.log(data)
  $scope.userBlob = data.blob
  $scope.username = data.username

  //$scope.secret = data.secret

  console.log($scope.userBlob)
   
                
                
        $location.path('/wallet')
        $scope.header_hidden = true
        $scope.navbar_visible = true

            $scope.$apply();

        $scope.$on('$routeChangeSuccess', function () { $scope.stopSpin() })
};//end blob_function()


}//end login()


}])
