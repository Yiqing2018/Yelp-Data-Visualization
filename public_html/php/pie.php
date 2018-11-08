<?php
// $arr = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);
// echo json_encode($arr);

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

$sql = "select star as name, Round(count(*)/999*100,2) as value from review group by star";

$result = $link->query($sql);


if(!$result){
    echo "An SQL error occured";
    exit;
}

$value = array();
if ($result->num_rows > 0) {
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







