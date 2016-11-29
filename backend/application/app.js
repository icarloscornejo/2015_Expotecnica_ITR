angular
.module('BRQB', [
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'ngMessages',
  'ui.router',
  'ngMdIcons'
])
.config(function ($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('main', {
        url: "/",
        templateUrl: "views/main.html",
        controller: "mainCTRL",
        authenticate: true
    })
    .state('dias', {
        url: "/dias",
        templateUrl: "views/dias.html",
        controller: "diasCTRL",
        authenticate: true
    })
    .state('eventos', {
        url: "/eventos",
        templateUrl: "views/eventos.html",
        controller: "eventosCTRL",
        authenticate: true
    })
    .state('lasquebuenas', {
        url: "/lasquebuenas",
        templateUrl: "views/lasquebuenas.html",
        controller: "lasquebuenasCTRL",
        authenticate: true
    })
    .state('locutores', {
        url: "/locutores",
        templateUrl: "views/locutores.html",
        controller: "locutoresCTRL",
        authenticate: true
    })
    .state('noticias', {
        url: "/noticias",
        templateUrl: "views/noticias.html",
        controller: "noticiasCTRL",
        authenticate: true
    })
    .state('programas', {
        url: "/programas",
        templateUrl: "views/programas.html",
        controller: "programasCTRL",
        authenticate: true
    })
    .state('usuarios', {
        url: "/usuarios",
        templateUrl: "views/usuarios.html",
        controller: "usuariosCTRL",
        authenticate: true
    })
    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "loginCTRL",
        authenticate: false
    })
    .state('cambiarpass', {
        url: "/cambiarpass",
        templateUrl: "views/cambiarpass.html",
        controller: "cambiarpassCTRL",
        authenticate: true
    })
    .state('cerrarsesion', {
        url: "/cerrarsesion",
        templateUrl: "views/cerrarsesion.html",
        controller: "cerrarsesionCTRL",
        authenticate: true
    });
})
.controller('appCTRL', ['$scope','$rootScope', function ($scope, $rootScope) {

    $rootScope.manageSession("get",{variable: "isLogged"}).then(function (data){
        $scope.isLogged = data == "true" ? true : false;
    }, function (data){});
}])
.controller('menuCTRL', ['$scope','$rootScope','$timeout','$mdBottomSheet', function ($scope, $rootScope, $timeout, $mdBottomSheet) {

    $scope.items = [
        {
            pag:'Dias',
            href:'#/dias',
            icono:'today'
        },
        {
            pag:'Las que buenas',
            href:'#/lasquebuenas',
            icono:'description'
        },
        {
            pag:'Locutores',
            href:'#/locutores',
            icono:'recent_actors'
        },
        {
            pag:'Programas',
            href:'#/programas',
            icono:'playlist_add'
        },
        {
            pag:'Usuarios',
            href:'#/usuarios',
            icono:'perm_identity'
        }
    ];

    $scope.show = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'views/account.html',
          controller: 'appCTRL',
          targetEvent: $event
        });
      };

    $rootScope.manageSession("get",{variable: "Usuario"}).then(function (data){
        $scope.Usuario = data;
    }, function (data){});
}])
.run(function ($rootScope, $http, $q, $state, $mdDialog, $mdToast, $animate) {

    $rootScope.isLogged = false;

    $rootScope.showToast = function(content) {
    $mdToast.show($mdToast.simple()
      .content(content)
      .position('top left')
      .hideDelay(1500)
      );
    };

    $rootScope.showAlert = function(ev, title, content, ok) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .title(title)
          .content(content)
          .ariaLabel('alert')
          .ok(ok)
          .targetEvent(ev)
      );
    };

    $rootScope.Select = function(query) {
        var deferred = $q.defer();
        $http.post("application/rest/select.php", {"query": query}).
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
        console.log(json);
        var deferred = $q.defer();
        $http.post("application/rest/save.php", json).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(data + status);
        });
        return deferred.promise;
    };

    $rootScope.Update = function(tabla, where, json){
        json.tabla = tabla;
        json.where = where;
        console.log(json);
        var deferred = $q.defer();
        $http.post("application/rest/update.php", json).
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
        $http.post("application/rest/delete.php", {"query": query}).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(data + status);
        });
        return deferred.promise;
    };

    $rootScope.manageSession = function(accion, json) {
        json.accion = accion;
        var deferred = $q.defer();
        $http.post("application/rest/session.php", json).
        success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
            deferred.resolve(data + status);
        });
        return deferred.promise;
    };

    $rootScope.$on("$stateChangeStart",
        function (event, toState, toParams, fromState, fromParams) {
            $rootScope.manageSession("get", {variable: "isLogged"}).then(function (isLogged) {
                if (toState.authenticate && isLogged != "true") {
                    $state.go("login");
                    event.preventDefault();
                }else{
                    $rootScope.isLogged = true;
                }
            }, function (isLogged) {
            });
        });
})
.filter('startFrom', function() {
    return function(input, start) {
        if(input != null){
            start = +start; //parse to int
            return input.slice(start);
        }else{
            return null;
        }
    }
});;
