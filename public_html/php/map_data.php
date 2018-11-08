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
# Try query or error
// $sql="SELECT name,city,review_count,longitude AS longitude,latitude AS latitude FROM business  where id<31";
// $sql="SELECT name,city,review_count,longitude AS longitude,latitude AS latitude FROM business where id<31 ";

$sql="Select city,name,review_count,longitude AS longitude,latitude AS latitude FROM business 
ORDER BY review_count DESC
limit 0,30;";

$result = $link->query($sql);


if(!$result){
    echo "An SQL error occured";
    exit;
}
# Build GeoJSON feature collection array
$geojson = array(
  'type'      => 'FeatureCollection',
  'features'  => array()
);

# Loop through rows to build feature arrays
while($row = $result->fetch_assoc()){
    // echo('get into loop'),'<br>';
    $properties = $row;
    # Remove x and y fields from properties (optional)
    unset($properties['longitude']);
    unset($properties['latitude']);
    
    // echo("properties");
    // echo '<br>';
    // echo(json_encode($properties));
    // echo '<br>';
    
    $feature = array(
        'type' => 'Feature',
        'geometry' => array(
            'type' => 'Point',
            'coordinates' => array(
                $row['longitude'],
                $row['latitude']
            )
        ),
        'properties' => $properties
    );
    
    // echo("features");
    // echo '<br>';
    // echo(json_encode($feature)),'<br>';
    
    # Add feature arrays to feature collection array
    array_push($geojson['features'], $feature);
    
    // echo(json_encode($feature)),'<br>';

}

header('Content-type: application/json');


// foreach($geojson['features'] as $result) {
//     echo $result['geometry']['coordinates'][0];
//     echo $result['geometry']['coordinates'][1],'<br>';
// }

$json=json_encode($geojson, JSON_NUMERIC_CHECK);
echo($json);

mysqli_close($link);
?>







