<?php
include 'dbconfig.php'; //se incluye la configuracion de la base de datos y la conexion
$input = json_decode(file_get_contents("php://input")); //aca se agarran todos los valores que se mandan del controlador angularjs
foreach ($input as $nombre => $valor) { //Se recorre todos los objetos que se han mandado desde el controlador de angularjs
	if($nombre == "query"){ //si el valor que se mando se llama query, pasara a una variable unica
		$query = mysqli_real_escape_string($conn, $valor); //aca con esta funcion de mysql se evitan caracteres inecesarios y es buena en seguridad
	}
}

if ($conn->query($query) === TRUE) { //Si la query se ejecuta con exito
    echo "Eliminado correctamente.";
} else { //Si ocurre algun error al ejecutar la query
    echo "Error: " . $conn->error; //Mostrando el error exacto
}

$conn->close(); //Cierre de conexion
?>