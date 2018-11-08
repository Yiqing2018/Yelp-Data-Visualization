d3version4.json("https://unpkg.com/world-atlas@1/world/110m.json", function (error, world, zoomed) {
    
  if (error) throw error;
  //console.log(world)

  //set map size
  var height = 400;
  var width = 600;

  //append svg
  var svg = d3version4.select('#map').
  append('svg').
  attr('width', width).
  attr('height', height);

  //set up d3 map projection
  var projection = d3version4.geoStereographic().scale(250).
  translate([width / 2, height / 2]);

  //set up the paths
  var geoPath = d3version4.geoPath().projection(projection);

  //add paths to svg
  var map = svg.append('path').
  datum(topojson.feature(world, world.objects.countries)).
  attr('d', geoPath).
  attr('fill', 'white').
  attr("stroke-width", 1).
  attr("stroke", "black");

  //call meteorite json data
  
  
var impacts = d3version4.json('http://dataviz2018.web.illinois.edu/php/map_data.php', function (err, data, i) {
//   var impacts = d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json', function (err, data, i) {
    
    if (error) throw error;

    var scale = d3version4.scaleLinear().domain([0, 2000]).range([1, 15]);
    // var scale = d3.scaleLinear().domain([0, 2000000]).range([1, 15]);

    var tooltip = d3version4.select("#tip");


    var meteors = svg.append('g');

    meteors.selectAll('path').
    data(data.features).
    enter().
    append('path').
    attr('class', 'meteors').
    attr('fill', 'red').
    attr('stroke', 'black').
    attr("stroke-width", 0.5).
    attr('d', geoPath.pointRadius(function (d, i) {
    //   if (d.properties.mass === null) {
      if (d.properties.review_count === null) {

        return 1;
      } else
      {
        return scale(d.properties.review_count);
        // return scale(d.properties.mass);

      }
    })).
    on('mouseover', function (d) {
      tooltip.html(
      'Name: ' + d.properties.name + '<br/>' +
      'Review Count: ' + d.properties.review_count + '<br/>'+
      'Location: ' + d.properties.city + '<br/>');
    }).

    on('mouseout', function () {
      tooltip.html('Hover over a point for more information!');
    //   tooltip.style('visibility', 'hidden');
    });


    //apply zoom effect to map
    svg.call(d3version4.zoom().
    scaleExtent([0.75, 4]).
    on("zoom", zoomed));

    //zoom function
    function zoomed() {
      map.attr("transform", d3version4.event.transform);
      meteors.attr("transform", d3version4.event.transform);
    }

  });
});
