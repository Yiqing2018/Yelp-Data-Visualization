var ajax=new XMLHttpRequest();
var method="GET";
var url="php/user_star.php"
var asynchronous=true;
ajax.open(method,url,asynchronous);
ajax.send();
var myData = [];
ajax.onreadystatechange=function(){
     if (ajax.readyState==4 && ajax.status==200){
        var objects=JSON.parse(this.responseText);
        var data=(objects[0]);
        for (var a in data) {
            myData.push(parseInt(data[a], 10));
            
        }
        console.log(myData);
        
// var myData = [],
    colors = ['#EEE1EB', '#B7D3D8' ],
    width = window.innerWidth*2/3,
    height = 400,
    padding = 100,
    barWidth = 50,
    outerPadding = .1,
    barPadding = .1;

// for ( var i = 0; i < 20; i++ ) {
// 	myData.push( Math.ceil( Math.random() * 100 ) + 20 );
// }
// myData.push(731);
// myData.push(483);
// myData.push(1653);
// myData.push(2942);
// myData.push(4192);

var colorScale = d3version3.scale.linear()
                  .domain( [ 0, d3version3.max( myData ) ] )
                  .range( colors );

var xScale = d3version3.scale.ordinal()
            .domain( d3version3.range( 0, myData.length ) )
            .rangeBands( [ padding, width - padding ], barPadding, outerPadding );

var yScale = d3version3.scale.linear()
              .domain( [ d3version3.max( myData ), 0  ]  )
              .range( [ height - (padding * 2), 0 ] );

var yAxisScale = d3version3.scale.linear()
              .domain( [ Math.round( d3version3.max( myData ) ), 0 ]  )
              .range( [ 0, height - ( padding * 2 ) ] );
// labels_name=['1 star','1-1.5 stars','1.5-2 stars','2-2.5 stars','2.5-3 stars','3-3.5 star','3.5-4 stars','4-4.5 stars','4.5-5 stars']
labels_name=['1','1-1.5','1.5-2','2-2.5','2.5-3','3-3.5','3.5-4','4-4.5','4.5-5']

var xAxis = d3version3.svg.axis()
              .scale( xScale )
              .orient( 'bottom' )
.tickFormat((d,i) => labels_name[i]).tickSize(1.2);

var yAxis = d3version3.svg.axis()
              .scale( yAxisScale )
              .orient( 'left' )
              .ticks( 6 ).tickSize(1.2);

var chart = d3version3.select( '#bar_chart' )
//   .style( 'background', 'rgb(240, 240, 240)' )
  .append( 'svg' )
    .attr( 'width', width )
    .attr( 'height', height );

var chartBars = chart.selectAll( 'rect' ).data( myData )
  .enter().append( 'rect' )
    .attr( 'class', 'chart-bar' )
    .attr( 'width', function( d ) { return xScale.rangeBand(); })
    .attr( 'height', 0 )
    .attr( 'fill', colorScale )
    .attr( 'x', function( d, i ) { return xScale( i ); })
    .attr( 'y', height  - padding );

var labelSVG = chart.selectAll( 'svg' ).data( myData )
  .enter().append( 'svg' )
  .attr( 'class', 'chart-label-svg' )
  .attr( 'width', 80 )
  .attr( 'height', 30 )
  .attr( 'x', function( d, i ) { return xScale( i ) + xScale.rangeBand(); })
  .attr( 'y', function( d ){ return height - yScale( d ) - padding - 30;})
  .style( 'opacity', '0' )
  .append( 'g' );

labelSVG.append( 'rect' )
  .attr( 'class', 'chart-label-rect' )
  .attr( 'width', 80 )
  .attr( 'height', 30 )
  .attr( 'x', 0 )
  .attr( 'y', 0 )
  .attr( 'fill', 'white' );

labelSVG.append( 'text' )
  .attr( 'x', '50%' )
  .attr( 'y', '50%' )
  .attr( 'text-anchor', 'middle' )
  .attr( 'alignment-baseline', 'middle' )
  .attr( 'fill', '#1695A3' )
  .text( function( d ) { return d; });

var xAxisG = chart.append( 'g' )
              .attr( 'class', 'axis' )
              .attr( 'transform', 'translate(0,' + (height - padding) + ')' )
              .call( xAxis );

var yAxisG = chart.append( 'g' )
              .attr( 'class', 'axis' )
              .attr( 'transform', 'translate(' + padding + ', '+ padding +')' )
              .call( yAxis );

var rectTransitions = chartBars
    .on('mouseenter', function( d, i ){
      d3version3.select( this )
        .style( 'fill', d3version3.rgb( colorScale( d ) ).brighter( .3 ) );
      d3version3.selectAll( '.chart-label-svg' )
        .filter(function( e, j ){
          if  (i === j ) {
            return this;
          }
        })
          .style( 'opacity', '1.0' );
    })
    .on('mouseleave', function( d, i ){
      d3version3.select( this )
        .style( 'fill', d3version3.rgb( colorScale( d ) ) );
        d3version3.selectAll( '.chart-label-svg' )
          .filter(function( e, j ){
            if ( i === j ) {
              return this;
            }
          })
          .style( 'opacity', '0' );
    })
  .transition()
    .duration( 1000 )
    .delay( function( d, i ) {return i * 15; })
    .ease( 'elastic' )
    .attr( 'height', function( d ) { return yScale( d ); })
    .attr( 'y', function(d) { return height - yScale(d) - padding; } );
        
        
        
        
        
        
        
        
        
        
        
        
     }

}



