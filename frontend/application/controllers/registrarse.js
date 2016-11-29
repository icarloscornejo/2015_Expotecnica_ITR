angular.module('FRQB')
.controller('registrarseCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

    $scope.validateForm = function (u,p1,p2){
        re = /^\w+$/;
        if(!re.test(u)) {
          $rootScope.showToast("El usuario debe de contener solamente letras, numeros y guiones bajos.");
          angular.element('#User').focus();
          return false;
        }
        if(p1 == p2){
            if(p1 == u) {
              $rootScope.showToast("La contraseña debe de ser diferente del usuario.");
              angular.element('#Pass').focus();
              return false;
            }
            re = /[0-9]/;
            if(!re.test(p1)) {
              $rootScope.showToast("La contraseña debe de contener al menos un numero (0-9).");
              angular.element('#Pass').focus();
              return false;
            }
            re = /[a-z]/;
            if(!re.test(p1)) {
              $rootScope.showToast("La contraseña debe de contener al menos una letra minuscula (a-z).");
              angular.element('#Pass').focus();
              return false;
            }
            re = /[A-Z]/;
            if(!re.test(p1)) {
              $rootScope.showToast("La contraseña debe de contener al menos una letra mayuscula (A-Z).");
              angular.element('#Pass').focus();
              return false;
            }
        }else{
            $rootScope.showToast("Las contraseñas se deben de parecer.");
            angular.element('#Pass').focus();
            return false;
        }
        return true;
    }

	$scope.limpiar = function (){
		$scope.usuarios = "";
		$scope.Pass2 = "";
	}

	$scope.registrar = function() {
        if($scope.validateForm($scope.usuarios.User, $scope.usuarios.Pass, $scope.Pass2)){
            $scope.usuarios.User = btoa($scope.usuarios.User);
            $scope.usuarios.Pass = btoa($scope.usuarios.Pass);
            $scope.usuarios.TipodeUsuarioID = 3;
            $rootScope.Insert("usuarios", $scope.usuarios).then(function (data){
                if(data == "Algo salio mal."){
                    $rootScope.showToast("No se pueden ingresar usuarios parecidos.");
                }else{
                    $rootScope.showToast("Correctamente ingresado.");
                }
                location.assign("#/login");
            }, function (data){});
        }
    };
}]);