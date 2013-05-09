$(document).ready(function(){

  $(".leaderboard").hide()
  $("#compute-button").on('click', function(){
    $(".graph").empty()
    var sample1 = $("#textarea1").val()
    var sample2 = $("#textarea2").val()
    var test_type = $('#test_type').val()
    var equal_var = $('#equal_var').val()

    var draw = function(hist1_values, hist1_intervals, hist2_values, hist2_intervals){

      var min = hist1_intervals[0]
      var max = hist1_intervals[0]

      for(i = 0; i < hist1_intervals.length; i++){
        if(hist1_intervals[i] < min){
          min = hist1_intervals[i]
        }
        if (hist1_intervals[i]>max){
          max = hist1_intervals[i]
        }
      }

      var range = max - min;
      var tick_width = range / 7.0;
      var axis = [];
      for(i=0 ;i<8 ;i++){
        axis.push((min + i * tick_width).toFixed(0) )
      }

      var dataset1 = hist1_values
      var dataset2 = hist2_values

      var w = 300
      var h = 100
      var barPadding = 1;
      var svg = d3.select('.graph')
                    .append("svg")
                    .attr("fill", "teal")
                    .attr("width", w)
                    .attr("height", h);
   
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

      var svg4 = d3.select('.graph')
                    .append("svg")
                    .attr("width", 300)
                    .attr("height", 25);

      svg4.selectAll("text")                   
        .data(axis)
        .enter()
        .append("text")
        .text(function(d){
          return d
        })
        .attr("x", function(d, i){
          return i *  (300 / 7) ;
        })
        .attr("y", 25);  
    

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

    }


    $.ajax({
      url: '/two_sample_test/compute',
      type: 'POST',
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
