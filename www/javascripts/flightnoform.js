app.controller('FormCtrl', function ($scope, $rootScope) {
  // $scope.$watch('query.departureDate', function() {
  //       $scope.query.departureDate = $filter('date')($scope.query.departureDate, "yyyy/MM/dd");
  // });

$scope.addFlight = function() {
	// $scope.query.departureDate = $filter('date')($scope.query.departureDate, "yyyy/MM/dd");
	var flights = JSON.parse(localStorage.getItem("flights"));
	
	// steroids.layers.pop();
	if(!flights){
		var f = [];
		f.push($scope.query);
		localStorage.setItem("flights", JSON.stringify(f));
		$scope.flights = f;
	} else {
		//flights = JSON.parse(localStorage.getItem("flights"));
		flights.push($scope.query);
		localStorage.setItem("flights", JSON.stringify(flights));
		$scope.flights = flights;
	}
};

$scope.getFlights = function(){
	$scope.flights = localStorage.getItem("flights");
};

$scope.removeFlights = function(){
	var flights = [];
	localStorage.setItem("flights", JSON.stringify(flights));
}

});

