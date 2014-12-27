angular.module('rp').controller('ModalDemoCtrl1',
function ($scope, $modal, $log) {



  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'connect_modal.html',
      controller: 'ModalInstanceCtrl1',
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

angular.module('rp').controller('ModalInstanceCtrl1', function ($scope, $modalInstance, items, $MongoDB) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

$MongoDB.remove

  $scope.ok = function () {

    $modalInstance.close($scope.selected.item);
    $MongoDB.create()
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});