var formApp = angular.module('formApp', []);


formApp.controller('FormCtrl', function ($scope) {

$scope.addFlight = function() {

	var flight = {
		"flightNumber": $scope.flightNum,
		"departureDate": $scope.flightDate
	}

	var flights = localStorage.getItem("flightArray");

	if(!flights){
		var flights = [];
		flights.push(flight);
		localStorage.setItem("flightArray", JSON.stringify(flights));
	} else {
		flights = JSON.parse(localStorage.getItem("flightArray"));
		flights.push(flight);
		localStorage.setItem("flightArray", JSON.stringify(flights));
	}
};

$scope.getFlights = function(){
	$scope.flights = localStorage.getItem("flightArray");
};

$scope.removeFlights = function(){
	var flights = [];
	localStorage.setItem("flightArray", JSON.stringify(flights));
}

});

