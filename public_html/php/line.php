<?php

$servername = "127.0.0.1";
$username = "dataviz2018_admin";
$password = "LoveIS590!";
$my_db = "dataviz2018_database";

$link = mysqli_connect($servername, $username, $password,$my_db);

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$sql="select year(date) as year,
month(date) as month,
count(*) as count 
from review
where year(date)>=2015
group by year(date),
month(date);";

$result = $link->query($sql);


if(!$result){
    echo "An SQL error occured";
    exit;
}

$value = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $value[]=$row;
    }

} else {
    echo "0 results";
}



$json=json_encode($value);
echo($json);

mysqli_close($link);
?>