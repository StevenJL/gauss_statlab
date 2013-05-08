$(document).ready(function(){

  $(".leaderboard").hide()
  $("#compute-button").on('click', function(){
    var canvas = $()
    var sample1 = $("#textarea1").val()
    var sample2 = $("#textarea2").val()
    var test_type = $('#test_type').val()
    var equal_var = $('#equal_var').val()

    var draw = function(hist1_values, hist1_intervals, hist2_values, hist2_intervals){
  
      var dataset1 = hist1_values
      var axis1 = hist1_intervals
      var dataset2 = hist2_values
      var axis2 = hist2_intervals
      for(i=0;i<axis1.length;i++){
        axis1[i]=axis1[i].toFixed(0)
      }
      for(i=0;i<axis2.length;i++){
        axis2[i]=axis2[i].toFixed(0)
      }
      var w = 300
      var h = 100
      var barPadding = 1;
      var svg = d3.select('.graph')
                    .append("svg")
                    .attr("fill", "teal")
                    .attr("width", w)
                    .attr("height", h);
      // debugger      
      svg.selectAll("rect")
        .data(dataset1)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
          return i * (w / dataset1.length)
        })
        .attr("y", function(d){
          return h - d * 4
        })
        .attr("width", w / dataset1.length - barPadding)
        .attr("height", function(d){
          return d * 4;
        })

      // var svg2 = d3.select('.graph')
      //               .append("svg")
      //               .attr("width", 500)
      //               .attr("height", 50);

      // debugger
      // svg2.selectAll("text")                   
      //   .data(axis1)
      //   .enter()
      //   .append("text")
      //   .text(function(d){
      //     return d
      //   })
      //   .attr("x", function(d, i){
      //     return i * (w / axis1.length) + 20;
      //   })
      //   .attr("y", 25);

      var svg3 = d3.select('.graph')
                    .append("svg")
                    .attr("fill", "red")
                    .attr("width", w)
                    .attr("height", h);

      svg3.selectAll("rect")
        .data(dataset2)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
          return i * (w / dataset2.length)
        })
        .attr("y", 0)
        .attr("width", w / dataset2.length - barPadding)
        .attr("height", function(d){
          return d * 4;
        })

      var svg4 = d3.select('.graph')
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 50);

      // debugger
      svg4.selectAll("text")                   
        .data(axis2)
        .enter()
        .append("text")
        .text(function(d){
          return d
        })
        .attr("x", function(d, i){
          return i * (w / axis2.length) + 20;
        })
        .attr("y", 25);
    }

    $.ajax({
      url: '/two_sample_test/compute',
      data: { sample1: sample1, sample2: sample2, test_type: test_type, equal_var: equal_var },
      success: function(data){
        $("#n1").html(data.n1)
        $("#n2").html(data.n2)
        $("#df").html(data.df)
        $("#t-stat").html(data.t.toFixed(3))
        $("#p-val").html(data.p.toFixed(3))
        draw(data.histogram1_values, data.histogram1_intervals, data.histogram2_values, data.histogram2_intervals)        
      }
    })
    $(".leaderboard").slideDown()
  })
})
