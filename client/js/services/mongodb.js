var module = angular.module('rp')


 module.factory('MongoDB', function ($mongolabResourceHttp) {
      
    return $mongolabResourceHttp('I changed angular-mongolab.js, use Project.collection instead, see below');
});

angular.module('rp').service('$MongoDB', ['$rootScope', 'MongoDB', '$connection_status', function ($scope, MongoDB, $connection_status) {
  
  
if(typeof $scope.userBlob.data.basicincome_co !== "undefined"){
$scope.connected = true
}
else $scope.connected = false
    
    
    /**
     * Add a currency
     */
    this.create = function ()
    {
      var basicincome_co = {
        currency: "RES",
        taxRate: 0.02
      };
     

      // Add an element
      $scope.userBlob.unshift("/basicincome_co", basicincome_co);

      MongoDB.collection($scope.userBlob.data.account_id)
      var passport = {type:"passport", network: "BitNation"}
      var contract = {type: "contract", currency: basicincome_co.currency, taxRate: basicincome_co.taxRate}

      new MongoDB(passport).$save().then(function (data) {
            console.log(data);
      });

      new MongoDB(contract).$save().then(function (data) {
            console.log(data);
      });


    $connection_status.connect()
      
      
    };
    

      /**
       * Remove currency
       *
       * @param index
       */
  this.remove = function (currency) {
        
        // Update blob
        $scope.userBlob.unset('/basicincome_co');
        
        
        // remove from MongoDB
        MongoDB.collection($scope.userBlob.data.account_id)
                
                //remove passport    
            MongoDB.query({type: "passport"}).then(function(data){
                      
            var temp = data
            var id
            id = temp[0]._id
            
            MongoDB.remove_one(id)
  
          })
                    
            //remove contract        
          MongoDB.query({type: "contract"}).then(function(data){
                      
            var temp = data
            var id
            id = temp[0]._id
            
            MongoDB.remove_one(id)
  
          })
          
          
        
        
    $connection_status.disconnect()
        }
        

this.delete_everything = function (currency) {
        
        // Update blob
        $scope.userBlob.unset('/basicincome_co');
        
        
        // remove from MongoDB
        MongoDB.collection($scope.userBlob.data.account_id)
                
                //remove passport    
            MongoDB.all({}).then(function(data){
            console.log(data)
            for(var i = 0; i<data.length;i++){
            
            new MongoDB(data[i]).$remove().then(function (data) {
            console.log(data);
            });
            }
          })

  new MongoDB().$delete_collection().then(function (data) {
            console.log(data);
            });
                    
                    
            //remove contract        
          MongoDB.query({type: "contract"}).then(function(data){
                      
            var temp = data
            var id
            id = temp[0]._id
            
            MongoDB.remove_one(id)
  
          })
          
          
        
        
    $connection_status.disconnect()
        }
        



}]);


 






