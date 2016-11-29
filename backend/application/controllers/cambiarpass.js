angular.module('BRQB')
.controller('cambiarpassCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

    $scope.limpiar = function(){
        $scope.Usuarios = "";
        $scope.PassAntigua = "";
        $scope.Pass2 = "";
    }

    $scope.validateForm = function (u,p1,p2){
        re = /^\w+$/;
        var res = true;
        console.log("user: "+u+" pass1: "+p1+" pass2: "+p2);
        if(p1 == p2){
            if(p1 == u) {
              $rootScope.showToast("La contraseña debe de ser diferente del usuario.");
              angular.element('#Pass').focus();
              res = false;
            }
            re = /[0-9]/;
            if(!re.test(p1)) {
              $rootScope.showToast("La contraseña debe de contener al menos un numero (0-9).");
              angular.element('#Pass').focus();
              res = false;
            }
            re = /[a-z]/;
            if(!re.test(p1)) {
              $rootScope.showToast("La contraseña debe de contener al menos una letra minuscula (a-z).");
              angular.element('#Pass').focus();
              res = false;
            }
            re = /[A-Z]/;
            if(!re.test(p1)) {
              $rootScope.showToast("La contraseña debe de contener al menos una letra mayuscula (A-Z).");
              angular.element('#Pass').focus();
              res = false;
            }
        }else{
            $rootScope.showToast("Las contraseñas se deben de parecer.");
            angular.element('#Pass').focus();
            res = false;
        }
        return res;
    }

    $scope.cambiarPass = function(ev) {
        $rootScope.manageSession("get",{variable: "UsuarioID"}).then(function (UsuarioID){
            $scope.Usuarios.ID = UsuarioID;
            var query = "SELECT ID, User FROM Usuarios WHERE ID = "+$scope.Usuarios.ID+" AND Pass = '"+btoa($scope.PassAntigua)+"'";
            $rootScope.Select(query).then(function (selectdata){
                if(selectdata != "No se hallaron registros."){
                    $rootScope.manageSession("get",{variable:"Usuario"}).then(function (data){
                        if($scope.validateForm(data, $scope.Usuarios.Pass, $scope.Pass2)){
                            $scope.Usuarios.ID = selectdata[0].ID;
                            $scope.Usuarios.Pass = btoa($scope.Usuarios.Pass);
                            $rootScope.Update("Usuarios","ID = "+$scope.Usuarios.ID, $scope.Usuarios).then(function (updatedata){
                                $rootScope.showAlert(ev, "Contraseña cambiada", "Su contraseña ha sido cambiada satisfactoriamente.", "Aceptar");
                                $scope.limpiar();
                            }, function (updatedata){});
                        }
                    }, function (data){});
                }else{
                    $rootScope.showToast("Su contraseña anterior es invalida.");
                    $scope.limpiar();
                }
            }, function (selectdata){});
        }, function (UsuarioID){});
    };
}]);