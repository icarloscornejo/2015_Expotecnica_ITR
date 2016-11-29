angular.module('BRQB')
.controller('usuariosCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

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

    $scope.logout = function(){
        $rootScope.isLogged = false;
    }

    $scope.limpiar = function(){
        $scope.Usuarios = "";
        $scope.Pass2 = "";
        $scope.canAdd = true;
    }

    $scope.setMapPosition = function (latitud, longitud){
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '200px';
        mapcanvas.style.width = '280px';
          
        document.querySelector('article').appendChild(mapcanvas);
        
        var latlng = new google.maps.LatLng(latitud, longitud);
        
        var myOptions = {
          zoom: 15,
          center: latlng,
          mapTypeControl: false,
          navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
        
        var marker = new google.maps.Marker({
            position: latlng, 
            map: map, 
            title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
        });
    }

    $scope.seleccionar = function() {

        $rootScope.manageSession("get",{variable: "UsuarioID"}).then(function (UsuarioID){
                var query = "SELECT * FROM Usuarios WHERE ID <> "+UsuarioID+" ORDER BY ID DESC";
                $rootScope.Select(query).then(function (data){
                    if(data != "No se hallaron registros."){
                        for(var i = 0; i < data.length; i++){
                            var encUser = data[i].User;
                            data[i].User = atob(encUser);
                        }
                        $scope.response = data;
                        var mapcanvas = document.createElement('div');
                        mapcanvas.id = 'mapcanvas';
                        mapcanvas.style.height = '200px';
                        mapcanvas.style.width = '280px';
                          
                        
                    }else{
                        $scope.response = null;
                    }
                }, function (data){});
            }, function (UsuarioID){});

        $rootScope.Select("SELECT * FROM TiposdeUsuarios").then(function (data){
            if(data != "No se hallaron registros."){
                $scope.TiposdeUsuarios = data;  
            }else{
                $scope.TiposdeUsuarios = null;
            }
        }, function (data){});

        $rootScope.Select("SELECT * FROM Locutores").then(function (data){
            if(data != "No se hallaron registros."){
                $scope.Locutores = data;  
            }else{
                $scope.Locutores = null;
            }
        }, function (data){});
    };

    $scope.agregar = function() {
            if($scope.validateForm($scope.Usuarios.User, $scope.Usuarios.Pass, $scope.Pass2)){
                $scope.Usuarios.User = btoa($scope.Usuarios.User);
                $scope.Usuarios.Pass = btoa($scope.Usuarios.Pass);
                $rootScope.Insert("Usuarios", $scope.Usuarios).then(function (data){
                    if(data == "Algo salio mal."){
                        $rootScope.showToast("No se pueden ingresar Usuarios parecidos.");
                    }else{
                        $rootScope.showToast(data);
                    }
                    $scope.seleccionar();
                    $scope.limpiar();
                }, function (data){});
            }
    };

    $scope.eliminar = function(id) {
        $rootScope.Delete("DELETE FROM Usuarios WHERE ID = "+id).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

    $scope.buscar = function() {
        var query = "SELECT * FROM Usuarios WHERE Nombre LIKE '%"+$scope.Buscar+"%' ORDER BY ID DESC";
        $rootScope.Select(query).then(function (data){
            if(data != "No se hallaron registros."){
                $scope.response = data;  
            }else{
                $scope.response = null;
            }
        }, function (data){});
    };

    $scope.seleccionar();
}]);