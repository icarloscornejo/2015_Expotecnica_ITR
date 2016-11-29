angular.module('FRQB')
.controller('locutoresCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

	var query = "SELECT * FROM Locutores ORDER BY ID DESC";
	$rootScope.Select(query).then(function (data){
	    if(data != "No se hallaron registros."){
	        $scope.response = data;  
	    }else{
	        $scope.response = null;
	    }
	}, function (data){});
}]);