$(document).ready(function(){

  $(".leaderboard").hide()
  $("#compute-button").on('click', function(){

    $(".graph").empty()

    var response = $("#textarea1").val().split(',')
    var predictor = $("#textarea2").val().split(',')

    var dataset = [];                   
    var numDataPoints = response.length;              
    for (var i = 0; i < numDataPoints; i++) {                
        dataset.push([parseFloat(response[i]), parseFloat(predictor[i])]); }    

    var draw = function(dataset){
      // debugger
      //Width and height
      var w = 370;
      var h = 300;
      var padding = 30;

      // debugger

      //Create scale functions
      var xScale = d3.scale.linear()
                           .domain([ d3.min(dataset, function(d) { return d[0]; }) , d3.max(dataset, function(d) { return d[0]; }) ])
                           .range([padding, w - padding * 2]);

      var yScale = d3.scale.linear()
                           .domain([ d3.min(dataset, function(d) { return d[1]; }) , d3.max(dataset, function(d) { return d[1]; }) ])
                           .range([h - padding, padding]);

      //Define X axis
      var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(5);

      //Define Y axis
      var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(5);

      //Create SVG element
      var svg = d3.select(".graph")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

      //Create circles
      svg.selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
              return xScale(d[0]);
         })
         .attr("cy", function(d) {
              return yScale(d[1]);
         })
         .attr("r", 3);

      svg.append("line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(0))
        .attr("x2", xScale(60))
        .attr("y2", yScale(20))
        .style("stroke", "rgb(6,120,155)");

      //Create X axis
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);
      
      //Create Y axis
      svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);


    }

    $.ajax({
      url: '/linear_regressions/compute',
      data: { dataset : dataset },
      success: function(results){
        var a = results.a.toFixed(2)
        var b = results.b.toFixed(2)
        $("#reg_line").html("y = "+a+" + "+b+"x")
        $("#corr").html(results.r.toFixed(2))
        draw(dataset)
        $("#predict-button").on("click",function(){
          var x_to_predict = $("#x_value").val()
          x_to_predict = parseFloat(x_to_predict)
          var y_predicted = a + b * x_to_predict
          $("#predicted_y").html(y_predicted)
        })
      }
    })

    $(".leaderboard").slideDown()
  })
})
