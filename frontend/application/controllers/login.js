angular.module('FRQB')
.controller('loginCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

	$scope.onLoad = function (){
	  $rootScope.manageSession("get", {variable: "isLoggedinFrontend"}).then(function (data) {
	    if(data == "true"){
	      location.assign("#/");
	    }else{
	    }
	  }, function (data) {});
	}

	$scope.onLoad();

	$scope.login = function (){
	  var query = "SELECT ID FROM Usuarios WHERE User = '"+btoa($scope.Usuario)+"' AND Pass = '"+btoa($scope.Pass)+"'";
	  $rootScope.Select(query).then(function(data){
	    console.log(data);
	    if(data != "No se hallaron registros."){
	      $rootScope.isLoggedinFrontend = true;
	      $rootScope.manageSession("set", {variable: "isLoggedinFrontend", value: "true"});
	      $rootScope.manageSession("set", {variable: "UsuarioIDinFrontend", value: data[0].ID});
	      $rootScope.manageSession("set", {variable: "UsuarioinFrontend", value: $scope.Usuario});
	      location.reload();
	    }else{
	      alert("Usuario o contraseña incorrectos.");
	      $scope.Usuario = "";
	      $scope.Pass = "";
	    }
	  }, function(data){});
	}
}]);