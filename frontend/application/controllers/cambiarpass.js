angular.module('FRQB')
.controller('cambiarpassCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

    $scope.limpiar = function(){
        $scope.usuarios = "";
        $scope.PassAntigua = "";
        $scope.Pass2 = "";
    }

    $scope.cambiarPass = function(ev) {
        $rootScope.manageSession("get",{variable: "UsuarioIDinFrontend"}).then(function (UsuarioIDinFrontend){
            $scope.usuarios.ID = UsuarioIDinFrontend;
            var query = "SELECT ID FROM usuarios WHERE ID = "+$scope.usuarios.ID+" AND Pass = '"+btoa($scope.PassAntigua)+"'";
            $rootScope.Select(query).then(function (selectdata){
                console.log(selectdata[0].ID);
                if(selectdata != "No se hallaron registros."){
                $scope.usuarios.ID = selectdata[0].ID;
                    if($scope.usuarios.Pass == $scope.Pass2){
                        $scope.usuarios.Pass = btoa($scope.usuarios.Pass);
                        $rootScope.Update("usuarios","ID = "+$scope.usuarios.ID, $scope.usuarios).then(function (updatedata){
                            alert("Su contraseña ha sido cambiada satisfactoriamente.");
                            $scope.limpiar();
                        }, function (updatedata){});
                    }else{
                        alert("Su nueva contraseña no coincide.");
                        $scope.limpiar();
                    }
                }else{
                    alert("Su nueva contraseña no coincide.");
                    $scope.limpiar();
                }
            }, function (selectdata){});
        }, function (UsuarioIDinFrontend){});
    };
}]);