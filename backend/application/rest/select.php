<?php
include 'dbconfig.php'; //se incluye la configuracion de la base de datos y la conexion
$input = json_decode(file_get_contents("php://input")); //aca se agarran todos los valores que se mandan del controlador angularjs
foreach ($input as $nombre => $valor) { //Se recorre todos los objetos que se han mandado desde el controlador de angularjs
	if($nombre == "query"){ //si el valor que se mando se llama query, pasara a una variable unica
		$query = $valor; //aca con esta funcion de mysql se evitan caracteres inecesarios y es buena en seguridad
	}
}

$rs = $conn->query($query); // se ejecuta el statement dando como resultado un resultset almacenado en $rs
$rs->data_seek(0); //Se agarra el contenido neto de la consulta

if(mysqli_num_rows($rs) == 0){ //Si el resultset no contiene filas, es decir no tiene registros
 	echo "No se hallaron registros.";
   	exit;
}else{
	while ($row = mysqli_fetch_assoc($rs)) { //Si hay registros, comienza a recorrer el resultset
      	$rows[] = $row; //Las rows del resultset se van almacenando en el arreglo rows[]
   	}
	echo(json_encode($rows)); //Se retorna el arreglo rows[] para manipularlo desde $scope.response en el controlador de angular
}

$conn->close(); //Cierre de conexion
?>