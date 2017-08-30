


    //sets the "view window" for table
    var outerWidth = 1600;
    var outerHeight = 800;
    var margin = { left: 100, top:30,  right:30, bottom:100 };  //gives space around graph so can fit axis


    //use if using csv:
    //var xColumn = "timestamp";
    //var yColumn = "temperature";

    var svg = d3.select("div#example1").append("svg")
      .attr("viewBox", "0 0 1600 800")
      .attr("preserveAspectRatio", "xMidYMid meet")  // these two lines make the chart responsive.  if not want responsive, replace w/ .attr("innerWidth", 500) (pixels) and same for ht
      .classed("svg-content", true);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var path = g.append("path");

    var innerWith = outerWidth - margin.left - margin.right;
    var innerHeight = outerHeight - margin.top - margin.bottom;

    //set the ranges
    var xScale = d3.time.scale().range([ 0, innerWidth ]);
    var yScale = d3.scale.linear().range ([ innerHeight, 0 ]);

    //define the axis
    var xAxisG = g.append("g")    //G for Group element for x-axis
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight + ")"); //have to translate or axis will be at top
    var yAxisG = g.append("g")
      .attr("class", "y axis");

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")           //use this scale (yScale) and orient on bottom
      .outerTickSize(0);          // Turn off the marks at the end of the axis.
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")             //use this scale (yScale) and orient on left
      .ticks(10)                   // Use approximately 5 ticks marks.
      .tickFormat(d3.format("s")) // Use intelligent abbreviations, e.g. 5M for 5 Million
      .outerTickSize(0);          // Turn off the marks at the end of the axis.

    //Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse;

    //Define the line
    var line = d3.svg.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); });


    function render(data) {

      xScale.domain( d3.extent(data, function (d) {
        d.x = parseDate(d.x);
        return d.x;
      }));
      yScale.domain( d3.extent(data, function (d) { return d.y; }));
      path.attr("d", line(data));

      xAxisG.call(xAxis);

      yAxisG.call(yAxis);

    }

    var myArrayOfObjects = [
      {x: "24-Apr-07", y: 130},
      {x: "25-Apr-07", y: 120},
      {x: "26-Apr-07", y: 180},
      {x: "27-Apr-07", y: 80},
      {x: "28-Apr-07", y: 40}
    ];

    render(myArrayOfObjects);
