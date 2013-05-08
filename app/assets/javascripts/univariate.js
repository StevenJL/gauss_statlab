$(document).ready(function(){

  $(".leaderboard").hide()
  $("#compute-button").on('click', function(){
    var input_data = $("#textarea").val()

    var draw = function(hist_values, hist_interval){

      var dataset = hist_values
      var axis = hist_interval
      for(i=0;i<axis.length;i++){
        axis[i]=axis[i].toFixed(0)
      }
      var w = 300
      var h = 200
      var barPadding = 1;
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
          return h - d * 10
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d){
          return d * 10;
        })

      var svg2 = d3.select('.graph')
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 50);

      svg2.selectAll("text")                   
        .data(axis)
        .enter()
        .append("text")
        .text(function(d){
          return d
        })
        .attr("x", function(d, i){
          return i * (w / axis.length) + 20;
        })
        .attr("y", 25);

    }

    $.ajax({
      url: '/univariate/compute',
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
    $(".leaderboard").slideDown()
  })

})
