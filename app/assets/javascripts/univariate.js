$(document).ready(function(){  

  $(".leaderboard").hide()

    var draw = function(hist_values, hist_interval){
      console.log(hist_values)
      var min = hist_interval[0]
      var max = hist_interval[0]

      for(i = 0; i < hist_interval.length; i++){
        if(hist_interval[i] < min){
          min = hist_interval[i]
        }
        if (hist_interval[i]>max){
          max = hist_interval[i]
        }
      }

      var max_height = hist_values[0]

      for(i = 0; i < hist_values.length; i++){
        if (hist_values[i] > max_height){
          max_height = hist_values[i]
        }
      }      

      var scale = 300 / max_height

      var dataset = hist_values;
      var range = max - min;
      var tick_width = range / 7.0;
      var axis = [];
      for(i=0 ;i<8 ;i++){
        axis.push((min + i * tick_width).toFixed(1) )
      }

      var w = 300;
      var h = 200;
      var barPadding = 1;
      var padding = 5;

      var svg = d3.select('.graph')
                    .append("svg")
                    .attr("fill", "teal")
                    .attr("width", w)
                    .attr("height", h);
 
      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
          return i * (w / dataset.length)
        })
        .attr("y", function(d){
          return h - d * scale
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d){
          return d * scale;
        })

      var svg2 = d3.select('.graph')
                    .append("svg")
                    .attr("width", 300)
                    .attr("height", 25);

      svg2.selectAll("text")                   
        .data(axis)
        .enter()
        .append("text")
        .text(function(d){
          return d
        })
        .attr("x", function(d, i){
          return i *  (265 / 7) ;
        })
        .attr("y", 25);  
    }


  $("#compute-button").on('click', function(){

    var input_data = $("#textarea").val()

      $.ajax({
      url: '/univariate/compute',
      type: 'POST',
      data: { input_data: input_data },
      success: function(data){
        $("#n").html(data.n)
        $("#min").html(data.min)
        $("#first_qart").html(data.first_quartile.toFixed(3))
        $("#mean").html(data.mean.toFixed(3))
        $("#median").html(data.median.toFixed(3))
        $("#third_qart").html(data.third_quartile.toFixed(3))
        $("#max").html(data.max)
        $("#s").html(data.s.toFixed(3))
        $("#sigma").html(data.sigma.toFixed(3))
        $("#samp_var").html(data.variance_sam.toFixed(3))
        $("#pop_var").html(data.variance_pop.toFixed(3))
        $("#ss").html(data.ss.toFixed(3))
        $("#kurt").html(data.kurtosis.toFixed(3))
        $(".graph").empty()
        draw(data.histogram_values, data.histogram_intervals)
      }
      })
      $(".leaderboard").slideDown();
    
    
  })

})
