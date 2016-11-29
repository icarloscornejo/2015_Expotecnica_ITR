angular.module('BRQB')
.controller('diasCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

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
        $scope.Dias = "";
        $scope.canAdd = true;
        $scope.canModify = false;
    }

    $scope.seleccionar = function() {
        var query = "SELECT * FROM Dias ORDER BY ID DESC";
        $rootScope.Select(query).then(function (data){
            if(data != "No se hallaron registros."){
                $scope.response = data;  
            }else{
                $scope.response = null;
            }
        }, function (data){});
    };

    $scope.agregar = function() {
        $rootScope.Insert("Dias", $scope.Dias).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

    $scope.eliminar = function(id) {
        $rootScope.Delete("DELETE FROM Dias WHERE ID = "+id).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

    $scope.buscar = function() {
        var query = "SELECT * FROM Dias WHERE Nombre LIKE '%"+$scope.Buscar+"%' ORDER BY ID DESC";
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
        var query = "SELECT * FROM Dias WHERE ID = "+id;
        $rootScope.Select(query).then(function (data){
            $scope.Dias = data[0];
        }, function (data){});
    };

    $scope.modificar = function() {
                $rootScope.Update("Dias","ID = "+$scope.Dias.ID, $scope.Dias).then(function (data){
                    $rootScope.showToast(data);
                    $scope.seleccionar();
                    $scope.limpiar();
                    $scope.canModify = false;
                    $scope.canAdd = true;
                }, function (data){});
    };

    $scope.seleccionar();
}]);