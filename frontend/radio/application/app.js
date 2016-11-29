angular
.module('RRQB', [
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'ngMdIcons'
])
.controller('appCTRL', ['$scope','$rootScope','$http', function ($scope,$rootScope,$http) {

	$scope.recargar = function (){
		location.reload();
	}

	$scope.titulo = "Cargando...";

	$scope.getDate = function (){
	    var date;
	    date = new Date();
	    date = date.getFullYear() + '-' +
	    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
	    ('00' + date.getDate()).slice(-2) + ' ' + 
	    ('00' + date.getHours()).slice(-2) + ':' + 
	    ('00' + date.getMinutes()).slice(-2) + ':' + 
	    ('00' + date.getSeconds()).slice(-2);
	    return date;
	}

	$scope.Volumen = 100;
	document.getElementById("player").volume = 1;
	document.getElementById("player").play();
	$scope.setVolume = function (){
		var vol = $scope.Volumen / 100;
		document.getElementById("player").volume = vol;
	}
	
	setInterval(function(){
		$http.get("http://192.168.16.244:8000/status-json.xsl").success(function(data) {
		    $scope.titulo = data["icestats"].source.title;
		    $scope.search($scope.titulo);
		});
	}, 8000);

	$scope.string = "";
	$scope.RecienEscuchadas = {};
	$scope.search = function (string){
		if($scope.string != string){
			var query = "SELECT * FROM RecienEscuchadas ORDER BY Fecha DESC";
			$rootScope.Select(query).then(function (data){
			    if(data != "No se hallaron registros."){
			        $scope.response = data;  
			    }else{
			        $scope.response = null;
			    }
			}, function (data){});

			$rootScope.imageSearch({"imagen":string}).then(function (data){
				if(data.indexOf("http") === 0){
					$scope.image = data;
				}else{
					$scope.image = "application/bg.png";
				}
			}, function (data){});

			$scope.RecienEscuchadas.Nombre = string;
			$scope.RecienEscuchadas.Fecha = $scope.getDate();
			$rootScope.Insert("RecienEscuchadas", $scope.RecienEscuchadas);

			$rootScope.Select("SELECT MAX(ID) AS Maximo FROM RecienEscuchadas").then(function (data){
				var minID = data[0].Maximo - 10;
				query = "DELETE FROM RecienEscuchadas WHERE ID < "+minID;
				$rootScope.Delete(query);
			}, function (data){});
		}else{
			$scope.aviso = "La misma.";
		}
		$scope.string = string;
	}

	if(navigator.platform != "Win32"){
		$scope.action = "play_arrow";
	}else{
		$scope.action = "pause";
	}

	$scope.PP = function (){
		var player = document.getElementById('player');
		if($scope.action == "pause"){
			player.pause();
			$scope.action = "play_arrow";
		}else{
			player.play();
			$scope.action = "pause";
		}
	}
}])
.run(function ($rootScope, $http, $q) {

	$rootScope.Select = function(query) {
	    var deferred = $q.defer();
	    $http.post("../application/rest/select.php", {"query": query}).
	    success(function(data, status, headers, config) {
	        deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
	        deferred.resolve(data + status);
	    });
	    return deferred.promise; 
	};

	$rootScope.Insert = function(tabla, json){
	    json.tabla = tabla;
	    var deferred = $q.defer();
	    $http.post("../application/rest/save.php", json).
	    success(function(data, status, headers, config) {
	        deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
	        deferred.resolve(data + status);
	    });
	    return deferred.promise;
	};

	$rootScope.Delete = function(query) {
        var deferred = $q.defer();
        $http.post("../application/rest/delete.php", {"query": query}).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(data + status);
        });
        return deferred.promise;
    };

    $rootScope.imageSearch = function(json) {
        var deferred = $q.defer();
        $http.post("application/imagesearch.php", json).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(data + status);
        });
        return deferred.promise;
    };
});
