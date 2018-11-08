<?php
$servername = "127.0.0.1";
$username = "dataviz2018_admin";
$password = "LoveIS590!";
$my_db = "dataviz2018_database";

$link = mysqli_connect($servername, $username, $password,$my_db);

// $link = mysqli_connect("127.0.0.1", "root", "LoveCS411!", "MUSIC");

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
	// echo "Success: A proper connection to MySQL was made!" . PHP_EOL;
	// echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;
$sql="SELECT category as text,count/10000+30 as size FROM business_category";

$result = $link->query($sql);

$value = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $value[]=$row;
    }

} else {
    echo "0 results";
}
// var_dump($value);
$json_obj= json_encode($value); 
echo $json_obj;

mysqli_close($link);
?>

