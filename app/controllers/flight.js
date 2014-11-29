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



app.controller('FetchCtrl', function($scope, $http, $templateCache, $filter, $rootScope) {
    
    $scope.flights = JSON.parse(localStorage.getItem("flights"));
    $scope.method = 'JSONP';
    
    $scope.fetch = function() {
      //
      $scope.flightNumber = $scope.flights[0].flightNum;
      $scope.date = $filter('date')($scope.flights[0].departureDate, "yyyy/MM/dd");
      $scope.url = 'https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/status/AA/'+ $scope.flightNumber +'/dep/'+ $scope.date +'?appId=c7c9c4f0&appKey=cacf8348266684a0eaeaef6dc3722402&utc=false&includeFlightPlan=false&maxPositions=2&callback=JSON_CALLBACK';

      $scope.code = null;
      $scope.response = null;

      $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
        success(function(data, status) {
          $scope.firstFlight = [];
          $scope.status = status;
          $scope.firstFlight.push(data);
        }).
        error(function(data, status) {
          $scope.firstFlight = data || "Request failed";
          $scope.status = status;
      });

      $scope.restFlights = [];

      if($scope.flights.length > 1 ){
        for(var i = 1; i < $scope.flights.length; i++) {
          $scope.flightNumber = $scope.flights[i].flightNum;
          $scope.date = $filter('date')($scope.flights[i].departureDate, "yyyy/MM/dd");
          $scope.url = 'https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/flight/status/AA/'+ $scope.flightNumber +'/dep/'+ $scope.date +'?appId=c7c9c4f0&appKey=cacf8348266684a0eaeaef6dc3722402&utc=false&includeFlightPlan=false&maxPositions=2&callback=JSON_CALLBACK';


          $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
            success(function(data, status) {
              $scope.status = status;


              $scope.restFlights.push(data);
            }).
            error(function(data, status) {
              $scope.restFlights.push("Request failed");
              $scope.status = status;
          });
        }
      }

      $scope.$watch('restFlights', function(newValue, oldValue){

      })

      $scope.$watch('firstFlight', function(newValue, oldValue){

      })
    };

    $scope.showForm = function() {
      //var webView = new steroids.views.WebView("http://localhost/flightnoform.html");
      var webView = new steroids.views.WebView("http://localhost/flightnoform.html");
      steroids.layers.push(webView);
    };

    $scope.getFlights = function(){
      $scope.flights = JSON.parse(localStorage.getItem("flights"));
    };

    
    $scope.count = 0;

    function timerMethod() {
        $scope.flights = JSON.parse(localStorage.getItem("flights"));   
        $scope.count+= 1;
    }
    // variables for gps data
    var currentLat;
    var currentLong;
    // calling gps
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess (position){
      // lat and long data
      currentLat = position.coords.latitude;
      currentLong = position.coords.longitude;
      // steroids.logger.log("Success!");
      // steroids.logger.log(currentLat);
      // steroids.logger.log(currentLong);

      // create origin and destination for google maps request
      var origin = new google.maps.LatLng(currentLat, currentLong);
      var destination = "O'Hare International Airport";

      // call google maps API
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          durationInTraffic: true,
          avoidHighways: false,
          avoidTolls: false
        }, callback);

      function callback(response, status) {
        // data returned from google maps
        navigator.notification.alert("It will take " + response.rows[0].elements[0].duration.text + " to get to " + destination + " from here");
        $scope.carTimeResponse = "It will take " + response.rows[0].elements[0].duration.text + " to get to " + destination + " from here";
        $scope.carTimeDestination = destination;
      }
    }
    function onError (error){
      steroids.logger.log("Failure!");
    }

    var timerId = setInterval(timerMethod, 1000);   

  });
