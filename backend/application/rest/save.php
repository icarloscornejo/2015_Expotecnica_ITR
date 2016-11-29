<?php

include 'dbconfig.php'; //se incluye la configuracion de la base de datos y la conexion
$input = json_decode(file_get_contents("php://input")); //aca se agarran todos los valores que se mandan del controlador angularjs
$values = ""; //Aca se guardaran todos los valores mandados desde angular y concatenados en la query
$init = 0; //variable para verificar si es el primer valor o el segundo en adelante
foreach ($input as $nombre => $valor) { //Se recorre todos los objetos que se han mandado desde el controlador de angularjs
	if($nombre == "tabla"){ //si el valor que se mando se llama query, pasara a una variable unica
		$query = "INSERT INTO ".mysqli_real_escape_string($conn, $valor)." SET ";
	}else{
		if($init > 0){ //Si el valor no es el primero, se concatena con una coma a su izquierda
			$values .= ", ".mysqli_real_escape_string($conn, $nombre).""." = '".mysqli_real_escape_string($conn, $valor)."'";
		}else{ //Si el valor es el primero, se concatena sin la coma
			$init = 1; //Se le dice que ya no es el primer valor
			$values .= "".mysqli_real_escape_string($conn, $nombre).""." = '".mysqli_real_escape_string($conn, $valor)."'";
		}
	}
}

$query .= $values; //Se concatena el ultimo parentesis

try{
	$stm = mysqli_query($conn, $query); //Se crea el statement para ejecutarlo
	if($stm){ //Si el statement se ejecuta correctamente
		echo "Insertado correctamente.";
	}else{
		echo "Algo salio mal.";
	}	
}catch(Exception $e){ //Si algo falla con el statement, viene a parar aqui
	echo $e;	
}

$conn->close(); //Cierre de conexion
?>