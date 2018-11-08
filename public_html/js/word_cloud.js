var ajax=new XMLHttpRequest();
var method="GET";
var url="php/word_cloud_data.php"
var asynchronous=true;
ajax.open(method,url,asynchronous);
ajax.send();
ajax.onreadystatechange=function(){
     if (ajax.readyState==4 && ajax.status==200){
        // console.log(this.responseText);
        var objects=JSON.parse(this.responseText);
        // console.log(objects);
        
        for(var i = 0; i < objects.length; i++){
            var obj = objects[i];
            for(var prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
        // console.log(objects);
        
        frequency_list=objects;
        // console.log(frequency_list);
    
        var color = d3version3.scale.linear()
        .domain([0,1,2,3,4,5,6,10,15,20,100])
        .range(["#E37979", "#E7A050", "#82BD85", "#8BCCC5", "#C8D1F6", "#9050E7", "#E75061", "#508DE7", "#F1C40F", "#5D6D7E", "#138D75", "#E69189"]);
        d3version3.layout.cloud().size([750, 400])
                .words(frequency_list)
                .rotate(0)
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();

     }
        
        // d3.select("#cloud").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");
        function draw(words) {
            d3version3.select("#cloud").append("svg")
                    .attr("width", 1200)
                    .attr("height", 400)
                    // .attr("class", "wordcloud")
                    .append("g")
                    
            // without the transform, words words would get cutoff to the left and top, they would
             // appear outside of the SVG area
                    .attr("transform", "translate(320,200)")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("fill", function(d, i) { return color(i); })
                    .attr("transform", function(d) {
                         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.text; });
        }
     
}



