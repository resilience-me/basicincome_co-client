var module = angular.module('rp');

module.service('$pay_dividends', ['$rootScope', 'WebSocket', '$network', function($scope, WebSocket, $network)
{
    
  this.submit = function(secret){
      console.log(secret)
      var SEND = []
      SEND.push({account_id: $scope.userBlob.data.account_id})

      WebSocket.send(JSON.stringify(SEND))
      console.log("sent: "+JSON.stringify(SEND))

      WebSocket.onopen(function() {
        console.log('connection');
        WebSocket.send('message')
      });

      WebSocket.onmessage(function(event) {
        
      var payments = JSON.parse(event.data)
      console.log("RECEIVED: ", event.data);
      

      
      
      var i = 0
      function loop(secret){
      
      send_payment($scope.userBlob.data.account_id, secret, payments[i].account, payments[i].amount, $scope.userBlob.data.basicincome_co[0].currency)
      
        i++
        if(i<payments.length)loop()
      }
      loop(secret)
      });
   
        
        
        
     function send_payment(ACCOUNT_ID, SECRET, destination, amount, currency){

    $network.remote.setSecret(ACCOUNT_ID, SECRET);
    var transaction = $network.remote.createTransaction('Payment', {
      account: ACCOUNT_ID,
      destination: destination,
      amount: {currency: currency, value: String(amount), issuer: ACCOUNT_ID}
    });
    transaction.on('resubmitted', function() {
    });
    transaction.submit(function(err, res) {
         if (err){
        console.log(err) 
        WebSocket.send(JSON.stringify(err));
         }
         else console.log(res), WebSocket.send(JSON.stringify(res));
    });
}//end send_payment()  
  }
    
}]);