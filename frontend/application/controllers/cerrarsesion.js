angular.module('FRQB')
.controller('cerrarsesionCTRL', ['$rootScope', function ($rootScope) {    
    $rootScope.isLoggedinFrontend = false;
    $rootScope.manageSession("set", {variable: "isLoggedinFrontend", value: "false"});
    $rootScope.manageSession("set", {variable: "UsuarioIDinFrontend", value: ""});
    $rootScope.manageSession("set", {variable: "UsuarioinFrontend", value: ""});
    location.reload();
}])