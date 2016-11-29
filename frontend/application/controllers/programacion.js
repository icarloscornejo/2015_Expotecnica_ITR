angular.module('FRQB')
.controller('programacionCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

	$scope.seleccionar = function (){
		var query = "SELECT p.ID AS ID, p.Nombre AS Nombre, p.Horario AS Horario, d.Nombre AS Dias FROM Programas AS p, Dias AS d WHERE d.ID = p.DiaID ORDER BY p.ID DESC";
		$rootScope.Select(query).then(function (data){
		    if(data != "No se hallaron registros."){
		        $scope.response = data;  
		    }else{
		        $scope.response = null;
		    }
		}, function (data){});
	}

	$scope.seleccionar();

	$scope.buscar = function() {
        var query = "SELECT p.ID AS ID, p.Nombre AS Nombre, p.Horario AS Horario, d.Nombre AS Dias FROM Programas AS p, Dias AS d WHERE d.ID = p.DiaID AND p.Nombre LIKE '%"+$scope.Buscar+"%' ORDER BY p.ID DESC";
        $rootScope.Select(query).then(function (data){
            if(data != "No se hallaron registros."){
                $scope.response = data;  
            }else{
                $scope.response = null;
            }
        }, function (data){});
    };
}]);