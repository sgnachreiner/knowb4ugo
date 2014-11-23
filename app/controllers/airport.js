// Index: http://localhost/views/airport/index.html

app.controller('IndexCtrl', function ($scope, AirportRestangular, storage) {


  // storage.set('airportArrayString','{message:"hello"}');

  // storage.bind($scope,'airportArrayString');

  // $scope.airportArray = JSON.parse($scope.airportArrayString)

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
  steroids.view.navigationBar.show("Airports");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/airport/show.html?id=<id>

app.controller('ShowCtrl', function ($scope, $filter, AirportRestangular, storage) {
  var fsCode;
  // Fetch all objects from the local JSON (see app/models/airport.js)
  AirportRestangular.all('airport').getList().then( function(airports) {
    // Then select the one based on the view's id query parameter
    $scope.airport = $filter('filter')(airports, {id: steroids.view.params['id']})[0];
    steroids.view.navigationBar.show($scope.airport.fsCode);
  });

  // Native navigation
  
  steroids.view.setBackgroundColor("#FFFFFF");

});
