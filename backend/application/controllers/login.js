angular.module('BRQB')
.controller('loginCTRL', ['$scope','$rootScope','$mdToast','$animate','$http', function ($scope,$rootScope,$mdToast,$animate,$http) {

  $scope.showSimpleToast = function(string) {
    $mdToast.show($mdToast.simple()
      .content(string)
      .position('top left')
      .hideDelay(1500)
      );
  };

  $scope.onLoad = function (){
    $rootScope.manageSession("get", {variable: "isLogged"}).then(function (data) {
      if(data == "true"){
        location.assign("#/");
      }else{
      }
    }, function (data) {});
  }

  $scope.onLoad();

  $scope.login = function (ev){
    var query = "SELECT ID FROM Usuarios WHERE User = '"+btoa($scope.Usuario)+"' AND Pass = '"+btoa($scope.Pass)+"'";
    $rootScope.Select(query).then(function(data){
      console.log(data);
      if(data != "No se hallaron registros."){
        $rootScope.Select("SELECT isActive FROM Usuarios WHERE ID = "+data[0].ID).then(function (isActive){
          console.log("State: "+isActive[0].isActive);
          if(isActive[0].isActive == 0){
            $rootScope.Update("Usuarios","ID = "+data[0].ID, {isActive: "1"}).then(function (data){
              console.log("State: "+data);
            }, function (data){});
            $scope.getUserPosition(data[0].ID);
            $rootScope.isLogged = true;
            $rootScope.manageSession("set", {variable: "isLogged", value: "true"});
            $rootScope.manageSession("set", {variable: "UsuarioID", value: data[0].ID});
            $rootScope.manageSession("set", {variable: "Usuario", value: $scope.Usuario});
            location.reload();
          }else{
            $rootScope.showAlert(ev, "Control de Sesiones", "Su sesion tambien se inicio en otra maquina.", "Aceptar");
            $scope.getUserPosition(data[0].ID);
            $rootScope.isLogged = true;
            $rootScope.manageSession("set", {variable: "isLogged", value: "true"});
            $rootScope.manageSession("set", {variable: "UsuarioID", value: data[0].ID});
            $rootScope.manageSession("set", {variable: "Usuario", value: $scope.Usuario});
            location.reload();
          }
        }, function (isActive){});
      }else{
        $scope.showSimpleToast('Usuario o contraseña incorrectos.');
        $scope.Usuario = "";
        $scope.Pass = "";
      }
    }, function(data){});
  }

  $scope.recovery = function (){
    var user = prompt("Ingrese su usuario:");
    var query = "SELECT l.Correo AS Correo, u.Pass AS Pass FROM Usuarios AS u, Locutores AS l WHERE u.User = '"+btoa(user)+"'";
    $rootScope.Select(query).then(function(data){
      if(data != "No se hallaron registros."){


        var mensaje = $scope.Usuario+' tu contraseña es: '+data[0].Pass;
        var body = '<tbody> <tr> <td class="ecxwrapper" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#333333;font-family:"Segoe UI", "Segoe WP", Arial,sans-serif;font-weight:normal;line-height:16px;font-size:12px;padding:0px 20px;" align="left" valign="top"> <table class="ecxtwelve ecxcolumns header" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;width:610px;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-size:14px;line-height:18px;text-decoration:none;"> <tbody> <tr> <td class="hr" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:1px;font-size:1px;text-decoration:none;padding:0px;" align="left" valign="top"> <hr style="color:#cccccc;height:1px;background:#cccccc;border:none;"> </td></tr><tr> <td class="spacer" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:1px;font-size:1px;text-decoration:none;padding:0px;" align="left" valign="top"><img width="1" height="5" src="https://bay169.mail.live.com/Handlers/ImageProxy.mvc?bicild=&amp;canary=tTDoSLjgf77TVxnF8nqI77gvBMjS3YAR4Oxw0rJmzOg%3d0&amp;url=http%3a%2f%2fimage.email.microsoftemail.com%2flib%2ffec7167270640274%2fm%2f1%2f19449_spacer.gif" border="0" style="display:block;text-decoration:none;clear:both;" alt="" align="left"></td></tr><tr> <td style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:18px;font-size:14px;text-decoration:none;padding:0px;" align="left" valign="top"> <table cellpadding="0" cellspacing="0" border="0" class="ecxmaxwidth" style="border-spacing:0;border-collapse:collapse;width:610px;"> <tbody> <tr> <td class="ecxheaderleft" align="left" style="vertical-align:top;text-align:left;border-collapse:collapse !important;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:1px;font-size:1px;text-decoration:none;padding:0px 20px 0px 0px;" valign="top"><a href="http://click.email.microsoftemail.com/?qs=8d0b53508dc94e3cafaf5db36edb708a89f0d5307bca279e6564c4ee8eccdb263f8f9adad18da959" style="color:#4c4c4c;text-decoration:none;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-size:1px;line-height:1px;" target="_blank"><img class="ecxresize" src="http://imagizer.imageshack.us/a/img661/4390/Ev0Yzi.png" align="left" style="text-decoration:none;clear:both;display:block;-ms-interpolation-mode:bicubic;border:none;" alt="Windows"></a></td><td> <p>Radio Que Buena | Administracion</p></td></tr></tbody> </table> </td></tr><tr> <td class="spacer" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:1px;font-size:1px;text-decoration:none;padding:0px;" align="left" valign="top"><img width="1" height="2" src="https://bay169.mail.live.com/Handlers/ImageProxy.mvc?bicild=&amp;canary=tTDoSLjgf77TVxnF8nqI77gvBMjS3YAR4Oxw0rJmzOg%3d0&amp;url=http%3a%2f%2fimage.email.microsoftemail.com%2flib%2ffec7167270640274%2fm%2f1%2f19449_spacer.gif" border="0" style="display:block;text-decoration:none;clear:both;" alt="" align="left"></td></tr><tr> <td class="spacer" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:1px;font-size:1px;text-decoration:none;padding:0px;" align="left" valign="top"><img width="1" height="5" src="https://bay169.mail.live.com/Handlers/ImageProxy.mvc?bicild=&amp;canary=tTDoSLjgf77TVxnF8nqI77gvBMjS3YAR4Oxw0rJmzOg%3d0&amp;url=http%3a%2f%2fimage.email.microsoftemail.com%2flib%2ffec7167270640274%2fm%2f1%2f19449_spacer.gif" border="0" style="display:block;text-decoration:none;clear:both;" alt="" align="left"></td></tr><tr> <td class="hr" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#4c4c4c;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:1px;font-size:1px;text-decoration:none;padding:0px;" align="left" valign="top"> <hr style="color:#cccccc;height:1px;background:#cccccc;border:none;"> </td></tr></tbody> </table> </td></tr><tr> <td class="spacer" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#333333;font-family:"Segoe UI", "Segoe WP", Arial,sans-serif;font-weight:normal;line-height:1px;font-size:1px;padding:0;" align="left" valign="top"><img width="1" height="10" src="https://bay169.mail.live.com/Handlers/ImageProxy.mvc?bicild=&amp;canary=tTDoSLjgf77TVxnF8nqI77gvBMjS3YAR4Oxw0rJmzOg%3d0&amp;url=http%3a%2f%2fimage.email.microsoftemail.com%2flib%2ffec7167270640274%2fm%2f1%2f19449_spacer.gif" border="0" style="display:block;text-decoration:none;clear:both;" alt="" align="left"></td></tr><tr> <td class="ecxwrapper" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#333333;font-family:"Segoe UI", "Segoe WP", Arial,sans-serif;font-weight:normal;line-height:16px;font-size:12px;padding:0px 20px;" align="left" valign="top"> <table class="ecxtwelve ecxcolumns" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;width:610px;"> <tbody> <tr> <td class="ecxsixteen" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#333333;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:22px;font-size:16px;text-decoration:none;padding:0px;" align="left" valign="top">Hola..</td></tr><tr> <td class="spacer" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#333333;font-family:"Segoe UI", "Segoe WP", Arial,sans-serif;font-weight:normal;line-height:1px;font-size:1px;padding:0px;" align="left" valign="top"><img width="1" height="15" src="https://bay169.mail.live.com/Handlers/ImageProxy.mvc?bicild=&amp;canary=tTDoSLjgf77TVxnF8nqI77gvBMjS3YAR4Oxw0rJmzOg%3d0&amp;url=http%3a%2f%2fimage.email.microsoftemail.com%2flib%2ffec7167270640274%2fm%2f1%2f19449_spacer.gif" border="0" style="display:block;text-decoration:none;clear:both;" alt="" align="left"></td></tr><tr> <td class="ecxsixteen" style="border-collapse:collapse !important;vertical-align:top;text-align:left;color:#333333;font-family:"Segoe UI", "Segoe WP", Arial, sans-serif;font-weight:normal;line-height:22px;font-size:16px;text-decoration:none;padding:0px;" align="left" valign="top">'+mensaje+'</td></tr></tbody> </table> </td></tr></tbody>';
        var datamail = {
            'key': '10t6uDn_tIJ5e9lgbnwTtQ',
            'message': {
              'from_email': 'laquebuena.cpanel@gmail.com',
              'to': [
                  {
                    'email': data[0].Correo,
                    'name': $scope.Usuario,
                    'type': 'to'
                  }
                ],
              'autotext': 'true',
              'subject': 'Recuperacion de contraseña.',
              'html': body
            }
          };

         console.log(datamail);
         alert("Su contraseña ha sido enviada a su correo.");
      }else{
        alert("Usuario no encontrado.");
      }
    }, function(data){});
  };

  $scope.getUserPosition = function (ID){
    $rootScope.Update("Usuarios","ID = "+ID, {Latitud: pos[0], Longitud: pos[1]}).then(function (data){
      console.log(data+" | pos: "+pos);
    }, function (data){});
  }

  var pos = [0,0];
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position){
      pos = [position.coords.latitude, position.coords.longitude];
      console.log(pos);
    }, function (position){
      $scope.showSimpleToast("Geolocalizacion no disponible.");
    });
  } else {
    $scope.showSimpleToast("Error.");
  }

}]);