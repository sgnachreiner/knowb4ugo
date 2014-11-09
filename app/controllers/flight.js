var flightApp = angular.module('flightApp', ['FlightModel']);


// Index: http://localhost/views/flight/index.html

flightApp.controller('IndexCtrl', function ($scope, FlightRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/flight/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/flight.js)
  FlightRestangular.all('flight').getList().then( function(flights) {
    $scope.flights = flights;
  });

  $.ajax({
        type: 'GET',
        url: 'https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/tracks/AA/360/dep/2014/11/9?appId=c7c9c4f0&appKey=cacf8348266684a0eaeaef6dc3722402&utc=false&includeFlightPlan=false&airport=ORD&maxPositions=2',
        dataType: 'jsonp',
        jsonpCallback: 'flightstatus',
        success: function(response) { 
                console.log(JSON.stringify(response));
                $('.result').html(JSON.stringify(response));
              },   
        error: function() {}
      });

  // Native navigation
  steroids.view.navigationBar.show("Flight index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/flight/show.html?id=<id>

flightApp.controller('ShowCtrl', function ($scope, $filter, FlightRestangular) {

  // Fetch all objects from the local JSON (see app/models/flight.js)
  FlightRestangular.all('flight').getList().then( function(flights) {
    // Then select the one based on the view's id query parameter
    $scope.flight = $filter('filter')(flights, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  steroids.view.navigationBar.show("Flight: " + steroids.view.params.id );
  steroids.view.setBackgroundColor("#FFFFFF");

});
