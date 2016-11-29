<?php
	$input = json_decode(file_get_contents("php://input")); //aca se agarran todos los valores que se mandan del controlador angularjs
	foreach ($input as $nombre => $valor) {
		if($nombre == "accion"){
			$accion = $valor;
		}
	}

	switch($accion){
		case "check":
		session_start();

		if(isset($_SESSION["isStarted"])) {
			echo "true";
		}
		else{
			echo "false";
		}

		break;
		case "start":
		session_start();

		$_SESSION["isStarted"] = true;

		echo "Session started.";

		break;
		case "destroy":

		session_start();

		session_destroy();

		echo "Session destroyed.";

		break;
		case "set":
		session_start();

		foreach ($input as $nombre => $valor) { //Se recorre todos los objetos que se han mandado desde el controlador de angularjs
			if($nombre == "variable"){
				$variable = $valor;
			}else if($nombre == "value"){
				$value = $valor;
			}
			$_SESSION[$variable]=$value;
			$tmpmsg = "set -> ".$variable.": ".$value;
		}

		echo $tmpmsg;

		break;
		case "get":
		session_start();

		foreach ($input as $nombre => $valor) { //Se recorre todos los objetos que se han mandado desde el controlador de angularjs
			if($nombre == "variable"){
				$variable = $valor;
			}
		}

		echo $_SESSION[$variable];
		
		break;
		case "getAll":
		session_start();
		echo json_encode($_SESSION);
		break;
	}

	?>