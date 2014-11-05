var flightsApp = angular.module('flightsApp', ['FlightsModel', 'ngTouch', 'ngResource']);


// Index: http://localhost/views/flights/index.html

flightsApp.controller('IndexCtrl', function ($scope, FlightsRestangular, $http) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/flights/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/flights.js)
  FlightsRestangular.all('flights').getList().then( function(flightss) {
    $scope.flightss = flightss;
  });

    $.ajax({
          type: 'GET',
          url: 'https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/tracks/AA/360/dep/2014/11/4?appId=c7c9c4f0&appKey=cacf8348266684a0eaeaef6dc3722402&utc=false&includeFlightPlan=false&airport=ORD&maxPositions=2',
          dataType: 'jsonp',
          jsonpCallback: 'flightstatus',
          success: function(response) { 
                  console.log(JSON.stringify(response));
                  $('.result').html(JSON.stringify(response));
                },   
          error: function() {}
        });
  //http get data
  // $http({
  //       method: 'GET',
  //       url: 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/tracks/AA/360/dep/2014/11/4',
  //       params: {utc: 'false', includeFlightPlan: 'false', airport: 'ORD', maxPositions: '2'},
  //       headers: {appId: 'c7c9c4f0', appKey: 'cacf8348266684a0eaeaef6dc3722402' }
  //    }).success (function(data, status, headers, config){
  //        // With the data succesfully returned, we can resolve promise and we can access it in controller
  //        $scope.d = data;
  //    }).error(function(data, status, headers, config) {
  //       $scope.d = data
  //       $scope.s = status;
  //       $scope.h = headers;
  //       $scope.c = config
  //    });

  // Native navigation
  steroids.view.navigationBar.show("Flights index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/flights/show.html?id=<id>

flightsApp.controller('ShowCtrl', function ($scope, $filter, FlightsRestangular) {

  // Fetch all objects from the local JSON (see app/models/flights.js)
  FlightsRestangular.all('flights').getList().then( function(flightss) {
    // Then select the one based on the view's id query parameter
    $scope.flights = $filter('filter')(flightss, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  steroids.view.navigationBar.show("Flights: " + steroids.view.params.id );
  steroids.view.setBackgroundColor("#FFFFFF");

});

function test(data) {
  $scope.result = data;
}
