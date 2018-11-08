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

$sql = "select sum(case when average_stars <= 1 then 1 else 0 end) as range1,\n"

    . "       sum(case when average_stars > 1 and average_stars <= 1.5 then 1 else 0 end) as range2,\n"

    . "       sum(case when average_stars > 1.5 and average_stars <= 2 then 1 else 0 end) as range3,\n"

    . "       sum(case when average_stars > 2 and average_stars <= 2.5 then 1 else 0 end) as range4,\n"

    . "       sum(case when average_stars > 2.5 and average_stars <= 3 then 1 else 0 end) as range5,\n"
    
    . "       sum(case when average_stars > 3 and average_stars <= 3.5 then 1 else 0 end) as range6,\n"
    
    . "       sum(case when average_stars > 3.5 and average_stars <= 4 then 1 else 0 end) as range7,\n"

    . "       sum(case when average_stars > 4 and average_stars <= 4.5 then 1 else 0 end) as range8,\n"

    . "       sum(case when average_stars > 4.5 and average_stars <= 5 then 1 else 0 end) as range9\n"

    . "from user";

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







