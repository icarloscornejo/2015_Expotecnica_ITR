<?php

    $input = json_decode(file_get_contents("php://input")); //aca se agarran todos los valores que se mandan del controlador angularjs
    foreach ($input as $nombre => $valor) {
        if($nombre == "imagen"){
            $i = $valor;
        }
    }

    $image = rawurlencode($i);
    $query = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=".$image."&imgsz=large";
    $query2 = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBDWkQkeJuA49gmn7Nt-xlj_nwR-Cv3Fxk&amp;cx=011930411303354181374:_yr8ijsj0z8&amp;q=".$image."&amp;searchType=image&amp;fileType=png,jpg&amp;alt=json";
                
    $json = file_get_contents($query);
    $data = json_decode($json);
    $results = array(); //define array here!
    foreach ($data->responseData->results as $result) {
        $results[] = array("url" => $result->url, "alt" => $result->title);
    }

    echo $results[0]['url'];
?>