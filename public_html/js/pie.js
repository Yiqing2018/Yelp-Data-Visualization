var ajax=new XMLHttpRequest();
var method="GET";
var url="php/pie.php"
var asynchronous=true;
ajax.open(method,url,asynchronous);
ajax.send();


var customData=[];
ajax.onreadystatechange=function(){
     if (ajax.readyState==4 && ajax.status==200){
        var objects=JSON.parse(this.responseText);
        for (var i = 0; i < objects.length; ++i) {
            customData.push({name:objects[i]['name'],value:objects[i]['value']})
        }

        // console.log(customData)
        plot();         
       
     }
}

var colors = [ "#D1EAD9","#E6E6FA","#FFE4C4","#D1DFEA",  "#FFE4E1" ];
function plot() {
	var parElemWidth = document.querySelector("#chart").parentElement.offsetWidth;
	parElemWidth = parElemWidth > 350 ? 350 : parElemWidth;
	var width = parElemWidth;
	var height = width;
	var radius = width / 2;
	var colorScale = d3.scaleOrdinal().range(colors);
	var tooltip = d3.select(".myTooltip");
	var arc = d3.arc().innerRadius(0).outerRadius(radius - 10);
	var pie = d3.pie().sort(null).value(function(d) { return d.value;});
	var svg = d3.select("#chart")
	          .append("svg")
	          .attr("width", width)
	          .attr("height", height)
	       //   .style("filter", "url('#filter')")
	          .append("g")
	          .attr("class", "group")
	          // moving each g to center
	          .attr("transform", "translate(" + width/2  + "," + (height / 2 ) + ")");
	var g = svg.selectAll(".arc").data(pie(customData))
								.enter().append("g")
								.attr("class", "arc");

	g.append("path")
										// D3 implicitly uses the Data bound to the SVG Group elements as
										// an input to the D3 Arc Generation function we named arc earlier.
										// The result of this function is then set as the d attribute for
										// the path.
										.attr("d", arc)
										.style("fill", function(d){ return colorScale(d.data.value)})
										.on("mouseover", function(d){
														tooltip.html("<span class='tooltipContent'>" + d.data.value + "%</span>");
														return tooltip.style("visibility", "visible").style("opacity", "1");
										})
										.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-35)+"px").style("left",(d3.event.pageX)-60 + "px");})
										.on("mouseout", function(){return tooltip.style("visibility", "hidden").style("opacity", "0");});
}

      



// var colors = ["#A2C2F1", "#CFCCE7", "#CCE5E7", "#E7CCE1", "#CAEDB4"];

// function plot() {
// 	var parElemWidth = document.querySelector("#chart").parentElement.offsetWidth;
// 	parElemWidth = parElemWidth > 350 ? 350 : parElemWidth;
// 	var width = parElemWidth;
// 	var height = width;
// 	var radius = width / 2;
// 	var colorScale = d3.scaleOrdinal().range(colors);
// 	var tooltip = d3.select(".myTooltip");
// 	var arc = d3.arc().innerRadius(0).outerRadius(radius - 10);
// 	var pie = d3.pie().sort(null).value(function(d) { return d.value;});
// 	var svg = d3.select("#chart")
// 	          .append("svg")
// 	          .attr("width", width)
// 	          .attr("height", height)
// 	       //   .style("filter", "url('#filter')")
// 	          .append("g")
// 	          .attr("class", "group")
// 	          // moving each g to center
// 	          .attr("transform", "translate(" + width/2  + "," + (height / 2 ) + ")");
// 	var g = svg.selectAll(".arc").data(pie(customData))
// 								.enter().append("g")
// 								.attr("class", "arc");

// 	g.append("path")
// 										// D3 implicitly uses the Data bound to the SVG Group elements as
// 										// an input to the D3 Arc Generation function we named arc earlier.
// 										// The result of this function is then set as the d attribute for
// 										// the path.
// 										.attr("d", arc)
// 										.style("fill", function(d){ return colorScale(d.data.value)})
// 										.on("mouseover", function(d){
// 														tooltip.html("<span class='tooltipContent'>" + d.data.value + "%</span>");
// 														return tooltip.style("visibility", "visible").style("opacity", "1");
// 										})
// 										.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-35)+"px").style("left",(d3.event.pageX)-60 + "px");})
// 										.on("mouseout", function(){return tooltip.style("visibility", "hidden").style("opacity", "0");});
// }

// document.addEventListener("DOMContentLoaded", function(event) { 
//   plot();
//   // for ie 9
//   if(window.attachEvent) {
//     window.attachEvent('onresize', function() {
//         alert('attachEvent - resize');
//     });
//   }
//   else if(window.addEventListener) {
//     window.addEventListener('resize', function() {
//       document.querySelector("#chart").innerHTML = "";
//       plot();
//     }, true);
//   }
// });        
      



