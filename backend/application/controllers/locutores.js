angular.module('BRQB')
.controller('locutoresCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

    $scope.currentPage = 0;
    $scope.pageSize = 3;
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
        $scope.Locutores = "";
        $scope.canAdd = true;
        $scope.canModify = false;
        $scope.cambiarImagen("");
    }

    var reader = new FileReader();

    reader.onloadend = function () {
        var str = reader.result;
        var tipo = str.substring(11);
        if(tipo.lastIndexOf("png",0) === 0){
            var res = str.substring(22);
        }else{
            var res = str.substring(23);          
        }
        $scope.Foto = res;
        $scope.cambiarImagen(str);
    }

    $("#uploader").change(function(){
        var input = this;
        if (input.files && input.files[0]) {
            reader.readAsDataURL(input.files[0]);
        }
    });

    $scope.cambiarImagen = function(str){
        var elemento = document.getElementById("imagen");
        elemento.src = str;
        if(str != ""){
            var res = str.substring(22);
            $scope.Foto = res;
        }else{
            $scope.Foto = "";
        }
    }

    $scope.seleccionar = function() {
        var query = "SELECT * FROM Locutores ORDER BY ID ASC";
        $rootScope.Select(query).then(function (data){
            if(data != "No se hallaron registros."){
                $scope.response = data;  
            }else{
                $scope.response = null;
            }
        }, function (data){});
    };

    $scope.agregar = function() {
        $scope.Locutores.Foto = $scope.Foto;
        $rootScope.Insert("Locutores", $scope.Locutores).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

    $scope.eliminar = function(id) {
        $rootScope.Delete("DELETE FROM Locutores WHERE ID = "+id).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

    $scope.buscar = function() {
        var query = "SELECT * FROM Locutores WHERE Nombre LIKE '%"+$scope.Buscar+"%' ORDER BY ID DESC";
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
        var query = "SELECT * FROM Locutores WHERE ID = "+id;
        $rootScope.Select(query).then(function (data){
            $scope.Locutores = data[0];
            $scope.Foto = $scope.Locutores.Foto;
            $scope.cambiarImagen("data:image/png;base64,"+$scope.Locutores.Foto);
        }, function (data){});
    };

    $scope.modificar = function() {
        $scope.Locutores.Foto = $scope.Foto;
                $rootScope.Update("Locutores","ID = "+$scope.Locutores.ID, $scope.Locutores).then(function (data){
                    $rootScope.showToast(data);
                    $scope.seleccionar();
                    $scope.limpiar();
                    $scope.canModify = false;
                    $scope.canAdd = true;
                }, function (data){});
    };

    $scope.seleccionar();
}]);