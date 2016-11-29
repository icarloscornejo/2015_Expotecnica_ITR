<?php
//login
session_start();
require('../rest/dbconfig.php'); //se incluye la configuracion de la base de datos y la conexion
require('fpdf/fpdf.php');
    
$usuario = $_SESSION['Usuario'];

//PDFHeader
$pdf = new FPDF();
$pdf->AddPage('P', 'Letter');
$pdf->SetMargins(10,10,10);
$pdf->SetFont('Arial', '', 12);
$pdf->Image('../../resources/images/logo.png' , 10 ,8, 45 , 25,'PNG');
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(70, 8, '', 0);
$pdf->Cell(100, 8, 'Reporte de Programas', 0);
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
$queryDias = "SELECT ID, Nombre FROM Dias ORDER BY ID ASC";
$rsDias = $conn->query($queryDias);
$rsDias->data_seek(0);  

//Headers
$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(10, 8, 'ID', 1);
$pdf->Cell(27, 8, 'Dia', 1);
$pdf->Cell(153, 8, 'Programas', 1);
$pdf->Cell(15, 8, 'Cantidad', 1);
$pdf->Ln(8);
$pdf->SetFont('Arial', '', 8);

//Data
while ($Dias = mysqli_fetch_assoc($rsDias)) { //Si hay registros, comienza a recorrer el resultset
    $NombreProgramas = "";
    $Cantidad = 0;
    $queryProgramas = "SELECT p.ID AS ID, p.Nombre AS Nombre, p.Horario AS Horario, d.Nombre AS Dias FROM Programas AS p, Dias AS d WHERE d.ID = p.DiaID ORDER BY d.ID ASC";
    $rsProgramas = $conn->query($queryProgramas);
    $rsProgramas->data_seek(0);
    while ($Programas = mysqli_fetch_assoc($rsProgramas)) { //Si hay registros, comienza a recorrer el resultset
    	if($Dias['Nombre'] == $Programas['Dias']){
    		if($NombreProgramas != ""){
    			$NombreProgramas .= ", ".$Programas['Nombre'];
    		}else{
    			$NombreProgramas .= $Programas['Nombre'];
    		}
            $Cantidad += 1;
    	}
    }
    $pdf->SetFont('Arial', 'B', 9);
    $pdf->Cell(10, 8, $Dias['ID'], 1);
    $pdf->SetFont('Arial', '', 8);
    $pdf->Cell(27, 8, $Dias['Nombre'], 1);
    $pdf->Cell(153, 8, $NombreProgramas, 1);
    $pdf->Cell(15, 8, $Cantidad, 1);
    $pdf->Ln(8);
    
}

//PageNumber
$pdf->Ln(8);
$pdf->Cell(175, 8, '', 0);
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(0,10,'Pagina '.$pdf->PageNo().'',0);

$pdf->Output();
?>