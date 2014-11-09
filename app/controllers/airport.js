var airportApp = angular.module('airportApp', ['AirportModel']);


// Index: http://localhost/views/airport/index.html

airportApp.controller('IndexCtrl', function ($scope, AirportRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/airport/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/airport.js)
  AirportRestangular.all('airport').getList().then( function(airports) {
    $scope.airports = airports;
  });

  // Native navigation
  steroids.view.navigationBar.show("Airport index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/airport/show.html?id=<id>

airportApp.controller('ShowCtrl', function ($scope, $filter, AirportRestangular) {

  // Fetch all objects from the local JSON (see app/models/airport.js)
  AirportRestangular.all('airport').getList().then( function(airports) {
    // Then select the one based on the view's id query parameter
    $scope.airport = $filter('filter')(airports, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  steroids.view.navigationBar.show("Airport: " + steroids.view.params.id );
  steroids.view.setBackgroundColor("#FFFFFF");

});
