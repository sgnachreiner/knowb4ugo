var app = angular.module('myApp', [ 'FlightModel', 'AirportModel', 'angularLocalStorage']);

app.controller('SplashCtrl', function ($scope) {

	$scope.showFlights = function() {
	  var webView = new steroids.views.WebView("http://localhost/views/flight/index.html");
	  steroids.layers.push(webView);
	}

	$scope.showAirports = function() {
	  var webView = new steroids.views.WebView("http://localhost/views/airport/index.html");
	  steroids.layers.push(webView);
	}

	$scope.showForm = function() {
	  //var webView = new steroids.views.WebView("http://localhost/flightnoform.html");
	  var webView = new steroids.views.WebView("http://localhost/newsfeed.html");
	  steroids.layers.push(webView);
	}
  // Native navigation
  steroids.view.setBackgroundColor("#FFFFFF");

});
