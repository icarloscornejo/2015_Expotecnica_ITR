angular.module('FRQB')
.controller('lasquebuenasCTRL', ['$scope','$rootScope','$sce', function ($scope,$rootScope,$sce) {

	$rootScope.Select("SELECT * FROM LasQueBuenas ORDER BY Posicion ASC").then(function (data){
		console.log(data);
	    if(data != "No se hallaron registros."){
	    	for(var i = 0; i < data.length; i++){
	    	    var UrlID = data[i].Url;
	    	    data[i].Url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+UrlID);
	    	}
	        $scope.response = data;  
	    }else{
	        $scope.response = null;
	    }
	}, function (data){});

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

}]);