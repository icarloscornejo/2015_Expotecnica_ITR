angular.module('BRQB')
.controller('lasquebuenasCTRL', ['$scope','$rootScope','$sce', function ($scope,$rootScope,$sce) {

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

    $scope.getYoutubeID = function (url){
        var ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }else{
            ID = url;
        }
        return ID;
    }

    $scope.validateYouTubeUrl = function (url) {    
        if (url != undefined || url != '') {        
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return true;
            }else{
                return false;
            }
        }
    }

    $scope.limpiar = function(){
        $scope.LasQueBuenas = "";
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
        $scope.posiciones = [];
        var query = "SELECT * FROM LasQueBuenas ORDER BY ID DESC";
        $rootScope.Select(query).then(function (data){
            var PosicionesUsadas = [0,0,0,0,0,0,0,0,0,0];
            var pos = 0;
            if(data != "No se hallaron registros."){
                for(var i = 0; i < data.length; i++){
                    var UrlID = data[i].Url;
                    data[i].Url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+UrlID);
                    PosicionesUsadas[pos] = data[i].Posicion;
                    pos += 1;
                }
                for(var i = 1; i < 11; i++){
                    var isUsed = false;
                    for(var x = 0; x < PosicionesUsadas.length; x++){
                        if(i == PosicionesUsadas[x]){
                            isUsed = true;
                        }
                    }
                    if(!isUsed){
                        var num = {"Nombre": "Posicion "+i, "Posicion":i};
                        $scope.posiciones.push(num);
                    }
                }
                $scope.response = data;  
            }else{
                for(var i = 1; i < 11; i++){
                    var num = {"Nombre": "Posicion "+i, "Posicion":i};
                    $scope.posiciones.push(num);
                }
                $scope.response = null;
            }
        }, function (data){});
    };

    $scope.agregar = function() {
        if($scope.validateYouTubeUrl($scope.LasQueBuenas.Url)){
            $scope.LasQueBuenas.Url = $scope.getYoutubeID($scope.LasQueBuenas.Url);
            $rootScope.manageSession("get",{variable: "UsuarioID"}).then(function (UsuarioID){
                $scope.LasQueBuenas.UsuarioID = UsuarioID;
                $scope.LasQueBuenas.Foto = $scope.Foto;
                $rootScope.Insert("LasQueBuenas", $scope.LasQueBuenas).then(function (data){
                    $rootScope.showToast(data);
                    $scope.seleccionar();
                    $scope.limpiar();
                }, function (data){});
            }, function (UsuarioID){});
        }else{
            angular.element('#Url').focus();
            $rootScope.showToast("La URL de Youtube no es valida.");
        }
    };

    $scope.eliminar = function(id) {
        $rootScope.Delete("DELETE FROM LasQueBuenas WHERE ID = "+id).then(function (data){
            $rootScope.showToast(data);
            $scope.seleccionar();
            $scope.limpiar();
        }, function (data){});
    };

    $scope.buscar = function() {
        var query = "SELECT * FROM LasQueBuenas WHERE Nombre LIKE '%"+$scope.Buscar+"%' ORDER BY ID DESC";
        $rootScope.Select(query).then(function (data){
            if(data != "No se hallaron registros."){
                for(var i = 0; i < data.length; i++){
                    var UrlID = data[i].Url;
                    data[i].Url = "https://www.youtube.com/watch?v="+UrlID;                    
                }
                $scope.response = data;  
            }else{
                $scope.response = null;
            }
        }, function (data){});
    };

    $scope.editar = function(id) {
        $scope.canModify = true;
        $scope.canAdd = false;
        var query = "SELECT * FROM LasQueBuenas WHERE ID = "+id;
        $rootScope.Select(query).then(function (data){
            $scope.LasQueBuenas = data[0];
            var UrlID = data[0].Url;
            $scope.LasQueBuenas.Url = "https://www.youtube.com/watch?v="+UrlID; 
            $scope.Foto = $scope.LasQueBuenas.Foto;
            $scope.cambiarImagen("data:image/png;base64,"+$scope.LasQueBuenas.Foto);
        }, function (data){});
    };

    $scope.modificar = function() {
        if($scope.validateYouTubeUrl($scope.LasQueBuenas.Url)){
            $scope.LasQueBuenas.Url = $scope.getYoutubeID($scope.LasQueBuenas.Url);
            $rootScope.manageSession("get",{variable: "UsuarioID"}).then(function (UsuarioID){
                $scope.LasQueBuenas.UsuarioID = UsuarioID;
                $scope.LasQueBuenas.Foto = $scope.Foto;
                $rootScope.Update("LasQueBuenas","ID = "+$scope.LasQueBuenas.ID, $scope.LasQueBuenas).then(function (data){
                    $rootScope.showToast(data);
                    $scope.seleccionar();
                    $scope.limpiar();
                    $scope.canModify = false;
                    $scope.canAdd = true;
                }, function (data){});
            }, function (UsuarioID){});
        }else{
            angular.element('#Url').focus();
            $rootScope.showToast("La URL de Youtube no es valida.");
        }
    };

    $scope.seleccionar();
}]);