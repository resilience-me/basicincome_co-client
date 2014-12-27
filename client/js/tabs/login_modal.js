angular.module('rp').controller('login_modalCtrl',
function ($scope, $modal, $log) {



  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'login_modal.html',
      controller: 'ModalInstanceCtrl2',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});



// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('rp').controller('ModalInstanceCtrl2', function ($scope, $modalInstance, items, $MongoDB, $vaultClient, $pay_dividends, usSpinnerService) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
        usSpinnerService.spin('spinner-2');
      
      $vaultClient.vaultClient.unlock(this.username, this.password, $scope.userBlob.encrypted_secret, secret_key);
function secret_key(err, data){
  var secret = data.secret
          usSpinnerService.stop('spinner-2');
console.log(secret)
$pay_dividends.submit(secret)
  
}

    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});