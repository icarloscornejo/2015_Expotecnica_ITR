<?php
// Este archivo consta de la conexion a la base de datos
$host = 'localhost'; //host en la que se encuentra la base de datos
$user = 'LQB'; //usuario por defecto en mysql
$pass = 'RadioQueBuena'; //root no posee contraseña
$dbname = 'RadioQueBuenaDB'; //nombre de la base de datos

$conn = new mysqli($host, $user, $pass, $dbname); //creacion de la conexion a la base de datos
ini_set('display_errors', 1);

?>