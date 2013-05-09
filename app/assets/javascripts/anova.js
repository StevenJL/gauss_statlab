$(document).ready(function(){

  $(".leaderboard").hide()
  var index = 4
  $("#add-field-button").on("click",function(){
    $("fieldset").append("<div class='control-group'><label class='control-label' for='textarea2'>Group " + index + "</label><div class='controls'><textarea class='input-xlarge' id='textarea2' rows='3'></textarea></div></div>")
      index += 1    
  })

  $("#compute-button").on("click", function(){

      var datasets = $(".input-xlarge")
      var data_sets_array = []
      for(i=0; i<datasets.length; i++){
        data_sets_array.push([datasets[i].value])
      }
    $.ajax({
      url: '/one_way_anovas/compute',
      type: 'POST',
      data: { data_sets_array: data_sets_array },
      success: function(results){
        var Fstat = results.f
        var pvalue = results.p
        var sst = results.sst
        var data_sets_array = results.data_sets_array

        $("#f-stat").html(Fstat.toFixed(3))
        $("#p-value").html(pvalue.toFixed(3))
        $("#sst").html(sst.toFixed(2))

         
          var margin = {top: 10, right: 50, bottom: 20, left: 50},
              width = 120 - margin.left - margin.right,
              height = 350 - margin.top - margin.bottom;

        var min = results.min
        var max = results.max

          var chart = d3.box()
              .whiskers(iqr(1.5))
              .width(width)
              .height(height);

            chart.domain([1, 9]);

          // debugger

          var svg = d3.select(".graph").selectAll("svg")
              .data(data_sets_array)
            .enter().append("svg")
              .attr("class", "box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.bottom + margin.top)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .call(chart);

          function iqr(k) {
            return function(d, i) {
              var q1 = d.quartiles[0],
                  q3 = d.quartiles[2],
                  iqr = (q3 - q1) * k,
                  i = -1,
                  j = d.length;
              while (d[++i] < q1 - iqr);
              while (d[--j] > q3 + iqr);
              return [i, j];
            };
          }

        $(".leaderboard").slideDown()
      }
    })
  })
})
