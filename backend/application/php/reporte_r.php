<?php
//login
session_start();
require('../rest/dbconfig.php'); //se incluye la configuracion de la base de datos y la conexion
require('fpdf/fpdf.php');

$tituloReporte = 'Reporte de Delmys';

$query = "SELECT * FROM Dias";

$margenIzquierdo = 20;
$margenDerecho = 20;
$margenArriba = 20;
$margenAbajo = 10;
$tipoPagina = 'Letter';
$orientacion = 'L';
$anchuraTotal = 0;

$usuario = $_SESSION['Usuario'];
if($tipoPagina == "Letter"){
	if($orientacion == "P"){
		$tamaño = 216;
		$anchuraTotal = $tamaño - ($margenIzquierdo + $margenDerecho);
	}else{
		$tamaño = 280;
		$anchuraTotal = $tamaño - ($margenIzquierdo + $margenDerecho);
	}
}else{
	if($orientacion == "P"){
		$tamaño = 216;
		$anchuraTotal = $tamaño - ($margenIzquierdo + $margenDerecho);
	}else{
		$tamaño = 356;
		$anchuraTotal = $tamaño - ($margenIzquierdo + $margenDerecho);
	}
}

//PDFHeader
$pdf = new FPDF($orientacion,'mm',$tipoPagina); //L=Landscape=Horizontal | P=Portrait=Vertical | mm=Milimetros | Letter=Carta | Legal=Oficio
$pdf->AddPage(); 
$pdf->SetMargins($margenIzquierdo,$margenArriba,$margenDerecho); //Margenes - 1cm = 10 | Izquierdo, Arriba, Derecho
$pdf->Ln($margenArriba-15);
$pdf->SetFont('Arial', '', 12);
$pdf->Image('../../resources/images/logo.png' , $margenIzquierdo ,8, 45 , 25,'PNG');
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell($anchuraTotal/2-25, 8, '', 0);
$pdf->Cell(100, 8, $tituloReporte, 0);
$pdf->Ln(23);
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(12, 10, 'Fecha: ', 0);
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(60,10,date('d-m-Y G:i:s'),0);
$pdf->Ln(6);
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(27,8,'Usuario activo: ',0);
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(60,8,$usuario,0);
$pdf->Ln(15);
$pdf->SetFont('Arial', '', 10);
$pdf->Ln(10);

//Consulta
$rs = $conn->query($query);
$rs->data_seek(0); 

//Headers
$pdf->SetFont('Arial', 'B', 9);

$columns = 0;
while ($field_info = mysqli_fetch_field($rs)) { //Si hay registros, comienza a recorrer el resultset
    $columns += 1;
}

$rs = $conn->query($query);
$rs->data_seek(0);
$anchura = $anchuraTotal / $columns;

while ($field_info = mysqli_fetch_field($rs)) { //Si hay registros, comienza a recorrer el resultset
	$pdf->Cell($anchura, 8, $field_info->name, 1);
}

$pdf->SetFont('Arial', '', 8);
$pdf->Ln(8);

//Data
while ($row = mysqli_fetch_assoc($rs)) { //Si hay registros, comienza a recorrer el resultset
    foreach($row as $_column) {
    	$pdf->Cell($anchura, 8, $_column, 1);
    }
    $pdf->Ln(8);
}

//PageNumber
$pdf->Ln(8);
$pdf->Cell(5, 8, '', 0);
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(0,10,'Pagina '.$pdf->PageNo().'',0);

$pdf->Output();
?>