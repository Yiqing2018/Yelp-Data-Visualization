var ajax1=new XMLHttpRequest();
var method1="GET";
var url1="php/user_review.php"
var asynchronous1=true;
ajax1.open(method1,url1,asynchronous1);
ajax1.send();
var theData = [];
ajax1.onreadystatechange=function(){
     if (ajax1.readyState==4 && ajax1.status==200){
        // console.log(this.responseText);
        var objects=JSON.parse(this.responseText);
        //  console.log(objects);
        
        var count = Object.keys(objects).length;
        // console.log(count);

        
        for (i = 0; i < count; i++) {
            // var data=(objects[i]);

            theData.push( { radius : 1, cx : objects[i]['yelping_time'], cy : objects[i]['review_count']} );
            
        }
        
        // console.log(objects[0]);
        // var data=(objects[0]);
        // for (var a in data) {
        //     // console.log(a);		/*属性名*/	
        //     // console.log(data[a]);	/*属性值*/
        //     myData.push(parseInt(data[a], 10));
            
        // }
        
        // console.log(theData);
        
        
        
/**
 * A D3 Scatter Plot chart with interactive nodes, 
 * crosshair and custom axis grid.
 */


var totalWidth = window.innerWidth*2/3;
// var totalHeight = window.innerHeight*2/3;
var totalHeight=400;

var color='#89A8C4';

var margin = {
  top: 10,
  left: 50,
  bottom: 30,
  right: 30
}

var width = totalWidth - margin.left - margin.right;
var height = totalHeight - margin.top - margin.bottom;


var formatDecimal = d3.format(',.0f');

var sizeDomain = d3.extent(theData, function(d) {
  return d.radius;
});

var sizeRange = [4, 16];

var sizeScale = d3.scaleLinear().domain(sizeDomain).range(sizeRange);

// X SCALE

var xRange = [0, width];

var xPadding = d3.mean(theData, function(d) {
  return d.cx
});
var xScale = d3.scaleLinear()
.domain([0,5000])
.range(xRange)
.nice(10);


var yRange = [height, 0];
var yScale = d3.scaleLinear().domain([0,400]).range(yRange).nice(5);

// COLOR SCALE 
var colorDomain = d3.extent(theData, function(d) {
  return d.radius
});

var colorize = d3.scaleSequential(d3.interpolateRdPu);

var colorScale = d3.scaleLinear()
  .domain(colorDomain)
  .range([0, 1]);

var xAxis = d3.axisBottom(xScale)
//   .ticks(10)
  .tickSize(6)
  .tickSizeInner(-height)
//   .tickSizeOuter(7);

var yAxis = d3.axisLeft(yScale).ticks(5)
  .tickSizeInner(-width)
  //.tickSizeOuter(7);

// SVG GROUP HIERARCHY 

var svg = d3.select('#scatter').append('svg')
  .attr("id", "scatterplot")
  .attr("width", totalWidth)
  .attr("height", totalHeight)
  //.style( "background-color", "hsl(0, 0%, 100%)" )
  //.style( "border", "dashed 1px gray" );

var mainGroup = svg.append("g")
  .attr("id", "mainGroup")
  .attr("transform", "translate( " + margin.left + ", " + margin.top + ")");

var xAxisGroup = mainGroup.append("g")
  .attr("id", "xaxis")
  .attr("class", "axis")
  .attr("transform", "translate( 0," + height + ")")
  .call(function customXAxis(g) {
    g.call(xAxis);
    //g.select(".domain").remove();
    //g.selectAll(".tick:not(:first-of-type) line"). // selects all tick lines except first
    g.selectAll(".tick:not(:first-of-type) line")
      .attr("stroke", "#777")
      .attr("stroke-dasharray", "3,2");

    g.selectAll(".tick text")
      .attr("y", 9);
  });

var yAxisGroup = mainGroup.append("g")
  .attr("id", "yaxis")
  .attr("class", "axis")
  .call(function customYAxis(g) {
    g.call(yAxis);
    //g.select(".domain").remove();
    g.selectAll(".tick:not(:first-of-type) line")
      .attr("stroke", "#777")
      .attr("stroke-dasharray", "3,2");
    g.selectAll(".tick text")
      .attr("x", -9);
  });

var eventGroup = mainGroup.append("g")
  .attr('id', 'event-overlay');

var crosshair = eventGroup.append("g")
  .attr("id", "crosshair");

var eventRect = eventGroup.append('rect');

var canvasGroup = eventGroup.append("g")
  .attr("id", "circleGroup");

// CHART ASSEMBLY

var crosshairSettings = {

  xLabelTextOffset: height + 12,
  yLabelTextOffset: -9,
  labelWidth: 38,
  labelHeight: 14,
  labelColor: "#aaa",
  labelStrokeColor: "none",
  labelStrokeWidth: "0.5px"

}

crosshair.append("line")
  .attrs({
    "id": "focusLineX",
    "class": "focusLine",
    //"stroke" : "black",
    //"stroke-width" : 1,
    //"stroke-linecap" : "butt"
  });
crosshair.append("line")
  .attrs({
    "id": "focusLineY",
    "class": "focusLine",
    //"stroke" : "black",
    //"stroke-width" : 1,
    //"stroke-linecap" : "butt"
  })

crosshair.append("rect") // x label bg
  .attrs({
    "id": "focusLineXLabelBackground",
    "class": "focusLineLabelBackground",
    "fill": crosshairSettings.labelColor,
    "stroke": crosshairSettings.labelStrokeColor,
    "stroke-width": crosshairSettings.labelStrokeWidth,
    "width": crosshairSettings.labelWidth, // should be a size of corresponding txt!
    "height": crosshairSettings.labelHeight,
  });

crosshair.append("text")
  .attrs({
    "id": "focusLineXLabel",
    "class": "label",
    "text-anchor": "middle",
    "alignment-baseline": "central"
  });

var ylabel = crosshair.append("g").attr("id", "yLabelGroup");
ylabel.append("rect") // y label bg
  .attrs({
    "id": "focusLineYLabelBackground",
    "class": "focusLineLabelBackground",
    "fill": crosshairSettings.labelColor,
    "stroke": crosshairSettings.labelStrokeColor,
    "stroke-width": crosshairSettings.labelStrokeWidth,
    "width": crosshairSettings.labelWidth,
    "height": crosshairSettings.labelHeight,
  });
ylabel.append("text")
  .attrs({
    "id": "focusLineYLabel",
    "class": "label",
    "text-anchor": "end",
    "alignment-baseline": "central"
  });

canvasGroup.selectAll("circle")
  .data(theData)
  .enter()
  .append('circle')
  .attr("cx", function(d) {
    return xScale(d.cx)
  })
  .attr("cy", function(d) {
    return yScale(d.cy)
  })
  .attr("r", function(d) {
    return sizeScale(sizeDomain[0]);
  })
//   .style("fill", function(d) {
//     return colorize(colorScale(d.radius));
//   })
  .style("fill", color)
  
  .style("opacity", 1)
  .on("mouseover", function(d, i) {

    d3.select(this)
      .attrs({ // this == circle
        "stroke": "#000000",
        "stroke-width": "1.5px",
        "cursor": "pointer",
      })
      .styles({
        "fill": "darkorange",
      });
    crosshair.style('display', null); // enable crosshair visibility 
    setCrosshair(xScale(d.cx), yScale(d.cy));

  })
  .on("mouseout", function(d, i) {

    d3.select(this).attrs({
        "stroke": "none"
      })
    //   .style("fill", function(d) {
    //     return colorize(colorScale(d.radius));
    //   });
       .style("fill",color);
  })
  //      if enabled will not snap to element
  //            .on('mousemove', function() {

//              var mouse = d3.mouse(this);
//              setCrosshair( mouse[0] ,  mouse[1] );
//            })
.transition()
  .attr("r", function(d) {
    return sizeScale(d.radius);
  });

eventRect.attrs({
    'width': width,
    'height': height
  })
  .styles({
    'opacity': 0.0,
    'display': null // not eligible for events
  })
  .on('mouseover', function() {
    // crosshair.attr("cursor", "crosshair");
    crosshair.style('display', null);

  })
  .on('mouseout', function() {
    crosshair.style('display', 'none');

  })
  .on('mousemove', function handleMouseMove() {

    var mouse = d3.mouse(this); // this == eventrect

    var x = mouse[0];
    var y = mouse[1];

    setCrosshair(x, y);

  });

function setCrosshair(x, y) {

  d3.select('#focusLineX')
    .attr('x1', x)
    .attr('y1', 0)
    .attr('x2', x)
    .attr('y2', height + 6);

  d3.select('#focusLineY')
    .attr('x1', -6)
    .attr('y1', y)
    .attr('x2', width)
    .attr('y2', y);

  d3.select("#focusLineXLabel")
    .attr("x", x)
    .attr("y", height + 12)
    .text(formatDecimal(xScale.invert(x)));
  d3.select("#focusLineXLabelBackground")
    .attr("transform", "translate( " + (x - crosshairSettings.labelWidth * 0.5) + " , " + (height + 5) + " )")
    .text(formatDecimal(xScale.invert(x)));

  d3.select("#focusLineYLabel")
    .attr("transform", "translate( -9, " + y + ")")
    .text(formatDecimal(yScale.invert(y)));
  d3.select("#focusLineYLabelBackground")
    .attr("transform", "translate( " + -crosshairSettings.labelWidth + ", " + (y - 8) + ")")

}        

        
        
        
     }

}



