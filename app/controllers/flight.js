// Index: http://localhost/views/flight/index.html

app.controller('IndexCtrl', function ($scope, FlightRestangular, storage) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/flight/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/flight.js)
  FlightRestangular.all('flight').getList().then( function(flights) {
    $scope.flights = flights;
  });

  // Native navigation
  steroids.view.navigationBar.show("Flights");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/flight/show.html?id=<id>

app.controller('ShowCtrl', function ($scope, $filter, FlightRestangular, storage) {

  $scope.Math = window.Math;
  // Fetch all objects from the local JSON (see app/models/flight.js)
  FlightRestangular.all('flight').getList().then( function(flights) {
    // Then select the one based on the view's id query parameter
    $scope.flight = $filter('filter')(flights, {id: steroids.view.params['id']})[0];
    steroids.view.navigationBar.show($scope.flight.name);
  });

  // Native navigation
  steroids.view.setBackgroundColor("#FFFFFF");

});



// app.controller('FetchController', ['$scope', '$http', '$templateCache', '$filter',
//   function($scope, $http, $templateCache, $filter) {
//     $scope.method = 'JSONP';
    

//     $scope.fetch = function() {
//       $scope.flights = JSON.parse(localStorage.getItem('flightArray'));
//       $scope.flightNumber = $scope.flights[0].flightNumber;
//       $scope.date = $filter('date')($scope.flights[0].departureDate, "yyyy/MM/dd");
//       $scope.url = 'https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/tracks/AA/'+ $scope.flightNumber +'/dep/'+ $scope.date +'?appId=c7c9c4f0&appKey=cacf8348266684a0eaeaef6dc3722402&utc=false&includeFlightPlan=false&maxPositions=2&callback=JSON_CALLBACK';

//       $scope.code = null;
//       $scope.response = null;

//       $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
//         success(function(data, status) {
//           $scope.status = status;
//           $scope.data = data;
//         }).
//         error(function(data, status) {
//           $scope.data = data || "Request failed";
//           $scope.status = status;
//       });
//     };

//     $scope.updateModel = function(method, url) {
//       $scope.method = method;
//       $scope.url = url;
//     };
//   }]);