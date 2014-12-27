 
module = angular.module('rp') 
  module.controller('WalletCtrl', ['$scope', '$location', 'MongoDB','$modal', '$connection_status','WebSocket',
    function ($scope, $location, MongoDB, $modal, $connection_status, WebSocket)
  {
    
$connection_status.check()
    
    
    /**
     * Add a currency
     */
    $scope.create = function ()
    {
      var basicincome_co = {
        currency: "RES",
        taxRate: 0.02
      };
     

      // Add an element
      $scope.userBlob.unshift("/basicincome_co", basicincome_co);

MongoDB.collection($scope.userBlob.data.account_id)

         var wallet = {type: "contract", currency: basicincome_co.currency, taxRate: basicincome_co.taxRate}

                new MongoDB(wallet).$save().then(function (data) {
                                console.log(data);
                            });


$connection_status.connect()
      
      
    };
    

      /**
       * Remove currency
       *
       * @param index
       */
       
       
        $scope.remove = function (currency) {
        
        // Update blob
        $scope.userBlob.unset('/basicincome_co');
        
        
        // remove from MongoDB
        MongoDB.collection($scope.userBlob.data.account_id)
                    
          MongoDB.query({type: "contract"}).then(function(data){
                      
            var temp = data
            var id
            id = temp[0]._id
            
            MongoDB.remove_one(id)
  
          })
        
$connection_status.disconnect()
}
        
        
        
        
        
        
        MongoDB.collection($scope.userBlob.data.account_id)
    
    MongoDB.query({ type: "safety_net" }).then(function(data){
          var temp = data

    $scope.safety_net = data[0].total_pathway

    });
  
    MongoDB.query({ type: "tax_blob" }).then(function(data){

    $scope.total_amount = data[0].total_amount

  });
  
  
  
  
  
     

  
  }]);


