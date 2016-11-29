angular
.module('FRQB', [
  'ngAnimate',
  'ngAria',
  'ngMaterial',
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
        authenticate: false
    })
    .state('staff', {
        url: "/staff",
        templateUrl: "views/locutores.html",
        controller: "locutoresCTRL",
        authenticate: false
    })
    .state('lasquebuenas', {
        url: "/lasquebuenas",
        templateUrl: "views/lasquebuenas.html",
        controller: "lasquebuenasCTRL",
        authenticate: false
    })
    .state('programacion', {
        url: "/programacion",
        templateUrl: "views/programacion.html",
        controller: "programacionCTRL",
        authenticate: false
    })
    .state('autores', {
        url: "/autores",
        templateUrl: "views/autores.html",
        controller: "autoresCTRL",
        authenticate: false
    });
})
.controller('appCTRL', ['$scope','$rootScope','$mdDialog', function ($scope, $rootScope, $mdDialog) {

    $scope.showMenu = function(ev) {        
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/menu.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(close) {
        }, function() {
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.close = function() {
            $mdDialog.hide();
        };
    }

    $rootScope.manageSession("get",{variable: "isLoggedinFrontend"}).then(function (data){
        $scope.isLoggedinFrontend = data == "true" ? true : false;
    }, function (data){});
}])
.controller('menuCTRL', ['$scope','$rootScope','$timeout','$mdBottomSheet', function ($scope, $rootScope, $timeout, $mdBottomSheet) {

    $scope.menuitems = [
        {
            icono:'store',
            texto:'INICIO',
            pag:'#/'
        },
        {
            icono:'recent_actors',
            texto:'STAFF',
            pag:'#/staff'
        },
        {
            icono:'description',
            texto:'LAS QUE BUENAS',
            pag:'#/lasquebuenas'
        },
        {
            icono:'playlist_add',
            texto:'PROGRAMACION',
            pag:'#/programacion'
        }
    ];
}])
.run(function ($rootScope, $http, $q, $state, $mdDialog, $mdToast, $animate) {

    $rootScope.isLoggedinFrontend = false;

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

    $rootScope.imageSearch = function(json) {
        var deferred = $q.defer();
        $http.post("application/rest/imagesearch.php", json).
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
            $rootScope.manageSession("get", {variable: "isLoggedinFrontend"}).then(function (isLoggedinFrontend) {
                if (toState.authenticate && isLoggedinFrontend != "true") {
                    $state.go("login");
                    event.preventDefault();
                }else{
                    $rootScope.isLoggedinFrontend = true;
                }
            }, function (isLoggedinFrontend) {
            });
        });
});

window.fbAsyncInit = function() {
                       FB.init({
                         appId      : '452128701517435',
                         xfbml      : true,
                         version    : 'v2.4'
                       });
                     };

                     (function(d, s, id){
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {return;}
                        js = d.createElement(s); js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                      }(document, 'script', 'facebook-jssdk'));
                (function(d, s, id) {
                              var js, fjs = d.getElementsByTagName(s)[0];
                              if (d.getElementById(id)) return;
                              js = d.createElement(s); js.id = id;
                              js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.4&appId=452128701517435";
                              fjs.parentNode.insertBefore(js, fjs);
                            }(document, 'script', 'facebook-jssdk'));