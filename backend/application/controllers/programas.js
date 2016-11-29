angular.module('BRQB')
.controller('programasCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.response = [];
    $scope.numberOfPages=function(){
        if($scope.response != null){
            return Math.ceil($scope.response.length/$scope.pageSize);                
        }else{
            return 0;
        }
    }

    $scope.canAdd = true;
    $scope.canModify = false;

    $scope.logout = function(){
        $rootScope.isLogged = false;
    }

    $scope.limpiar = function(){
        $scope.Programas = "";
        $scope.canAdd = true;
        $scope.canModify = false;
    }

    $scope.seleccionar = function() {
        var query = "SELECT p.ID AS ID, p.Nombre AS Nombre, p.Horario AS Horario, d.Nombre AS Dias FROM Programas AS p, Dias AS d WHERE d.ID = p.DiaID ORDER BY p.ID DESC";
        $rootScope.Select(query).then(function (data){
            if(data != "No se hallaron registros."){
                $scope.response = data;  
            }else{
                $scope.response = null;
            }
        }, function (data){});

        $rootScope.Select("SELECT * FROM Dias").then(function (data){
            if(data != "No se hallaron registros."){
                $scope.Dias = data;  
            }else{
                $scope.Dias = null;
            }
        }, function (data){});
    };

    $scope.agregar = function() {
        $rootScope.Insert("Programas", $scope.Programas).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

    $scope.eliminar = function(id) {
        $rootScope.Delete("DELETE FROM Programas WHERE ID = "+id).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

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

    $scope.editar = function(id) {
        $scope.canModify = true;
        $scope.canAdd = false;
        var query = "SELECT * FROM Programas WHERE ID = "+id;
        $rootScope.Select(query).then(function (data){
            $scope.Programas = data[0];
        }, function (data){});
    };

    $scope.modificar = function() {
                $rootScope.Update("Programas","ID = "+$scope.Programas.ID, $scope.Programas).then(function (data){
                    $rootScope.showToast(data);
                    $scope.seleccionar();
                    $scope.limpiar();
                    $scope.canModify = false;
                    $scope.canAdd = true;
                }, function (data){});
    };

    $scope.seleccionar();
}]);