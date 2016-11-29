angular.module('FRQB')
.controller('mainCTRL', ['$scope','$rootScope', function ($scope,$rootScope) {

	$scope.carrousel = [
        {
            imagen: 'resources/images/carrousel/camilo.png',
            descripcion: 'Camilo Sesto'
        },
        {
            imagen: 'resources/images/carrousel/descarga.png',
            descripcion: 'La descarga musical'
        },
        {
            imagen: 'resources/images/carrousel/pispireta.png',
            descripcion: 'La hora pispireta'
        },
        {
            imagen: 'resources/images/carrousel/salud.png',
            descripcion: 'Que buena salud'
        },
        {
            imagen: 'resources/images/carrousel/temerarios.png',
            descripcion: 'Los temerarios'
        },
        {
            imagen: 'resources/images/carrousel/tigres.png',
            descripcion: 'Los tigres del norte'
        },
        {
            imagen: 'resources/images/carrousel/vacilon.png',
            descripcion: 'El vacilon de la manana'
        }
    ]; 
}]);