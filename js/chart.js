
// D3 histogram code
// Based heavily on http://bl.ocks.org/mbostock/3048450

function drawChart(n, p, iterations) {

    function flip(n, p){
      // n = number of trials
      // p = probability of success

      var countSuccess = 0;
      // Repeat for n trials
      for (var i = 0; i < n; i++) {
        // if random [0, 1) less than probability indicated, count success 
        if (Math.random() < p) countSuccess++;
      }
      return countSuccess;
    }

    function flipRep(n, p, iterations) {
      var flipOutcomes = [];

      for (var i = 0; i < iterations; i++){
        flipOutcomes[i] = flip(n,p);
      }

      return flipOutcomes;
    }

    // Create a flip data set
    var flipData = flipRep(n, p, iterations);

    // A formatter for counts.
    var formatCount = d3.format(",.0f");

    var margin = {top: 100, right: 40, bottom: 60, left: 90},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // If the x-range is on the larger side (large sample)
    // then switch to 3 standard deviations from expected.
    //   -> x lower-limit = higher of ( 0 or 3 standard deviations below expected )
    //   -> x upper-limit = lower of ( n or 3 standard deviations above expected )
    var domainXmin = n > 44 & p < 1 & p > 0 ? Math.round(Math.max( 0 , n * p - 4 * Math.sqrt( n * p * (1 - p)) )) : 0;
    var domainXmax = n > 44 & p < 1 & p > 0 ? Math.round(Math.min( n , n * p + 4 * Math.sqrt( n * p * (1 - p)) )) : n;

    var x = d3.scale.linear()
        .domain([ domainXmin, domainXmax])
        .range([0, width]);

    // Generate a histogram using uniformly-spaced bins.
    // Set the upper limit on the number of bins to 40.

    var bins = n < 44 ? n : 40;
    var data = d3.layout.histogram()
        .bins(x.ticks(bins))
        (flipData);
 
    for (var i = 0; i < data.length; i++) {
      data[i].y = data[i].y / iterations;
    }


    var domainYmax = Math.ceil(10 * ( d3.max(data, function(d) { return d.y; }) )) / 10;

    var y = d3.scale.linear()
        .domain([0, domainYmax])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("#hist-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", (x.range()[1] - x.range()[0]) / data.length - 4)
        .attr("height", function(d) { return height - y(d.y); })
        .style("fill", "#BADA55");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - 180)
        .attr("y", height + 40)
        .text("Number of Heads");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -70)
        .attr("x", -height/2 + 40)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Proportion");

    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2) - 10)
      .attr("text-anchor", "middle")  
      .style("font-size", "18px") 
      .text("You just flipped " + n + ( p === .5 ? " fair " : " unfair " ) + " coins and");

    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2) + 10)
      .attr("text-anchor", "middle")  
      .style("font-size", "18px") 
      .text(" and counted the number of heads.");


    var text = svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2) + 40)
      .attr("text-anchor", "middle")  
      .style("font-size", "18px") 
      .text("Then you did ");

    text.append("svg:tspan").style("font-style", "italic").text("that ");
    text.append("svg:tspan").text( iterations + " times.");


}

function updateChart(n, p, iterations) {
  d3.select("svg").remove();
  drawChart(n, p, iterations);
}