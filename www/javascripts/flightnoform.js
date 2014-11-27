app.controller('FormCtrl', function ($scope, $rootScope) {

  // $scope.$watch('query.departureDate', function() {
  //       $scope.query.departureDate = $filter('date')($scope.query.departureDate, "yyyy/MM/dd");
  // });

$scope.addFlight = function() {
	if(!$rootScope.flights){
		$rootScope.flights = [];
	}
	// $scope.query.departureDate = $filter('date')($scope.query.departureDate, "yyyy/MM/dd");
	$rootScope.flights.push($scope.query);

	steroids.layers.pop();
	// if(!flights){
	// 	var flights = [];
	// 	flights.push(flight);
	// 	localStorage.setItem("flightArray", JSON.stringify(flights));
	// } else {
	// 	flights = JSON.parse(localStorage.getItem("flightArray"));
	// 	flights.push(flight);
	// 	localStorage.setItem("flightArray", JSON.stringify(flights));
	// }
};

$scope.getFlights = function(){
	$scope.flights = localStorage.getItem("flightArray");
};

$scope.removeFlights = function(){
	var flights = [];
	localStorage.setItem("flightArray", JSON.stringify(flights));
}

});

