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

    var draw = function(dataset, a, b){

      var a = parseFloat(a);
      var b = parseFloat(b);
      var w = 370;
      var h = 300;
      var padding = 30;

      var min = d3.min(dataset, function(d) { return d[0]; })
      var max = d3.max(dataset, function(d) { return d[0]; })
      var xScale = d3.scale.linear()
                           .domain([ min , max ])
                           .range([padding, w - padding * 2]);

      var yScale = d3.scale.linear()
                           .domain([ d3.min(dataset, function(d) { return d[1]; }) , d3.max(dataset, function(d) { return d[1]; }) ])
                           .range([h - padding, padding]);

      var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(5);

      var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(5);

      var svg = d3.select(".graph")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

      svg.append("line")
        .attr("x1", xScale(min))
        .attr("y1", yScale(a + min*b))
        .attr("x2", xScale(max))
        .attr("y2", yScale(a + max*b))
        .attr("stroke-width", 3)
        .style("stroke", "rgb(201,2,2)");


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
        draw(dataset, a, b)
        $("#predict-button").on("click",function(){
          var x_to_predict = $("#x_value").val()
          x_to_predict = parseFloat(x_to_predict)
          var y_predicted = parseFloat(a) + parseFloat(b) * x_to_predict
          $("#predicted_y").html(y_predicted.toFixed(2))
        })
      }
    })

    $(".leaderboard").slideDown()
  })
})
