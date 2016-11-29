angular.module('BRQB')
.controller('cerrarsesionCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {
	$rootScope.manageSession("get", {variable: "UsuarioID"}).then(function (data){
		$scope.UpdateState(data);
	}, function (data){});    

	$scope.UpdateState = function (ID){
		console.log("UPDATE ID: "+ID);
		$rootScope.Update("Usuarios","ID = "+ID, {isActive: "0"}).then(function (updatedata){
		  console.log(updatedata);
		  $scope.unSetAll();
		}, function (updatedata){});
	}

	$scope.unSetAll = function (){
		$rootScope.isLogged = false;
		$rootScope.manageSession("set", {variable: "isLogged", value: "false"});
		$rootScope.manageSession("set", {variable: "UsuarioID", value: ""});
		$rootScope.manageSession("set", {variable: "Usuario", value: ""});
		$scope.reload();
	}

	$scope.reload = function (){
		location.reload();
	}
    
}])