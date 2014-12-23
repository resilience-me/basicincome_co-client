var app = angular.module('rp', ['ng', 'ngRoute', 'ui.bootstrap', 'angularSpinner', 'angular-websocket', 'mongolabResourceHttp']);

app.config(function(WebSocketProvider){
    WebSocketProvider
      .prefix('')
      .uri('wss://basicincomeco-41322.onmodulus.net/:443');
  });
  
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'login.html', controller: 'AppCtrl'}).
      when('/wallet', {templateUrl: 'wallet.html', controller: 'WalletCtrl'}).
      when('/charts', {templateUrl: 'charts.html', controller: 'ChartsCtrl'}).
      when('/account', {templateUrl: 'account.html', controller: 'AppCtrl'}).
      when('/about', {templateUrl: 'about.html', controller: 'AppCtrl'}).
      when('/passports', {templateUrl: 'passports.html', controller: 'AppCtrl'}).

      otherwise({redirectTo: '/'
      });
  }]);



// a factory for MongoLabs API

app.constant('MONGOLAB_CONFIG',{API_KEY:'_5sK-6UJIaR72iqjdI0lHAo7l90nA9yp', DB_NAME:'flat_btc_basicincome_co'});




app.controller('AppCtrl', ['$scope', 'WebSocket', '$network',
    function ($scope, WebSocket, $network) {
   
   
   $scope.update_values = function(){

      var SEND = []
      SEND.push({account_id: $scope.userBlob.data.account_id})
      SEND.push($scope.userBlob.data.flat_btc_basicincome_co)
                
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
      function loop(){
      
      send_payment($scope.userBlob.data.account_id, $scope.secret, payments[i].account, payments[i].amount, $scope.userBlob.data.flat_btc_basicincome_co[0].currency)
      
        i++
        if(i<payments.length)loop()
      }
      loop()
      });
   }
        
        
        
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


$scope.logout = function(){
  window.location.assign("http://basicincome.co")
}
      


    }]);
    
    
    
    