var ajax2=new XMLHttpRequest();
var method2="GET";
var url2="php/line.php"
var asynchronous2=true;
ajax2.open(method2,url2,asynchronous2);
ajax2.send();
ajax2.onreadystatechange=function(){
     if (ajax2.readyState==4 && ajax2.status==200){
        var items=JSON.parse(this.responseText);
        var data=[]
        for(var i=0;i<items.length;i=i+12){
            var monthData=[];
            for(var j=0;j<12;++j){
                // items[i+j]
                monthData.push({month:items[i+j]['month'],value:parseInt(items[i+j]['count'],10)})
            }
            data.push({name:items[i]['year'],monthlyData:monthData})
        }
        DrawMultiLineChart(data, "divChartTrends");
     }
}


        function DrawMultiLineChart(Data, DivID) {
            var margin = { top: 20, right: 80, bottom: 30, left: 50 },
             width = window.innerWidth*2/3-margin.left-margin.right ,
             height = 400 - margin.top - margin.bottom;

            var parseDate = d3version3.time.format("%B");

            var x = d3version3.scale.ordinal()
                    .rangeRoundBands([0, width]);

            var y = d3version3.scale.linear()
                    .range([height, 0]);

            // var color = d3version3.scale.category10();
            var color = d3version3.scale.category20c();
                var labels_name=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            var xAxis = d3version3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat((d,i) => labels_name[i]).tickSize(1.2);


            var yAxis = d3version3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);


            var xData = Data[0].monthlyData.map(function (d) { return parseDate(new Date(d.month)); });
            //console.log(xData);
          

            var line = d3version3.svg.line()
                //.interpolate("basis")
                .x(function (d) { return x(parseDate(new Date(d.month))) + x.rangeBand() / 2; })
                .y(function (d) { return y(d.value); });

            var svg = d3version3.select("#" + DivID).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            color.domain(Data.map(function (d) { return d.name; }));

            x.domain(xData);

            var valueMax = d3version3.max(Data, function (r) { return d3version3.max(r.monthlyData, function (d) { return d.value; }) });
            var valueMin = d3version3.min(Data, function (r) { return d3version3.min(r.monthlyData, function (d) { return d.value; }) });
            y.domain([valueMin, valueMax]);

            //Drawing X Axis
            svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

            // Drawing Horizontal grid lines.
            svg.append("g")
                .attr("class", "GridX")
              .selectAll("line.grid").data(y.ticks()).enter()
                .append("line")
                .attr(
                {
                    "class": "grid",
                    "x1": x(xData[0]),
                    "x2": x(xData[xData.length - 1]) + x.rangeBand() / 2,
                    "y1": function (d) { return y(d); },
                    "y2": function (d) { return y(d); }
                });
            // Drawing Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end");
                    // .text(RevenueName);

            // Drawing Lines for each segments
            var segment = svg.selectAll(".segment")
                            .data(Data)
                            .enter().append("g")
                            .attr("class", "segment");
          
            segment.append("path")
                    .attr("class", "line")
                    .attr("id", function (d) { return d.name; })
                    .attr("visible",1)
                    .attr("d", function (d) { return line(d.monthlyData); })
                    .style("stroke", function (d) { return color(d.name); });
                        // Creating Dots on line
            segment.selectAll("dot")
                    .data(function (d) { return d.monthlyData; })
                    .enter().append("circle")
                    .attr("r", 5)
                    .attr("cx", function (d) { return x(parseDate(new Date(d.month))) + x.rangeBand() / 2; })
                    .attr("cy", function (d) { return y(d.value); })
                    .style("stroke", "white")
                    .style("fill", function (d) { return color(this.parentNode.__data__.name); })
                    .on("mouseover", mouseover)
                    .on("mousemove", function (d) {
                        divToolTip
                        // .text(this.parentNode.__data__.name +" : "+ d.value)
                        .text(this.parentNode.__data__.name +"-"+d.month+" : "+ d.value)
                        .style("left", (d3version3.event.pageX + 15) + "px")
                        .style("top", (d3version3.event.pageY - 10) + "px");
                    })
                    .on("mouseout", mouseout);
          
            segment.append("text")
                    .datum(function (d) { return { name: d.name, RevData: d.monthlyData[d.monthlyData.length - 1] }; })
                    .attr("transform", function (d) {
                        var xpos = x(parseDate(new Date(d.RevData.month))) + x.rangeBand() / 2;
                        return "translate(" + xpos + "," + y(d.RevData.value) + ")";
                    })
                    .attr("x", 3)
                    .attr("dy", ".35em")
                    .attr("class", "segmentText")
                    .attr("Segid", function (d) { return d.name; })
                    .text(function (d) { return d.name; });
                               
            d3version3.selectAll(".segmentText").on("click", function (d) {
                var tempId = d3version3.select(this).attr("Segid");
                var flgVisible = d3version3.select("#" + tempId).attr("visible");

                var newOpacity = flgVisible == 1 ? 0 : 1;
                flgVisible = flgVisible == 1 ? 0 : 1;

                // Hide or show the elements
                d3version3.select("#" + tempId).style("opacity", newOpacity)
                    .attr("visible", flgVisible);

            });
             // Adding Tooltip
            var divToolTip = d3version3.select("body").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 1e-6);

            function mouseover() {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 1);
            }
            function mouseout() {
                divToolTip.transition()
                    .duration(500)
                    .style("opacity", 1e-6);
            }
        }
// Calling function
// fnDrawMultiLineChart(Data, "divChartTrends");