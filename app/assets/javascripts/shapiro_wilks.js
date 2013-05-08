$(document).ready(function(){

  $(".leaderboard").hide()
  $("#compute-button").on('click', function(){
    var input_data = $("#textarea").val().split(',')
    var input_data_num = []
    for(i=0;i<input_data.length;i++){
      input_data_num.push(parseFloat(input_data[i]))
    }
    // debugger

    $('.graph').empty()

    $("#w-stat").html(ShapiroWilkW(input_data_num))

    var draw = function(input) { 
      // debugger
        var width = 270,
            height = 270,
            margin = {top: 20, right: 10, bottom: 20, left: 35},
            n = 10000; // number of samples to generate
         
        var chart = d3.qq()
            .width(width)
            .height(height)
            .domain([-.1, 1.1])
            .tickFormat(function(d) { return ~~(d * 100); });
         
        var vis = d3.select(".graph").append("svg")
            .attr("width", (width + margin.right + margin.left) * 3)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // input_data = [98, 82, 119, 74, 130, 108, 117, 68, 112, 107, 101, 70, 79, 100, 135, 114, 109, 106, 115, 95, 107, 100, 88, 76, 90, 97, 98, 143, 92, 95, 92, 91, 110, 90, 83, 87, 120, 125, 114, 96, 79, 128, 109, 91, 97, 80, 91, 108, 72, 82, 113, 101, 83, 97, 119, 63, 92, 77, 109, 100, 117, 89, 114, 123, 106, 112, 83, 118, 92, 127, 77, 77, 99, 85, 101, 108, 103, 94, 120, 62, 109, 117, 113, 90, 80, 90, 71, 101, 124, 92, 112, 108, 106, 98, 112, 85, 72, 123, 116, 74]

        
        // debugger
        var input_mean = mean(input_data)
        var input_sd = Math.sqrt(variance(input_data))
        var input_data_sorted = input_data.sort(function(a,b){return a-b});

        // debugger

        var sample_size = input_data_sorted.length
        var raw_percentiles = [];

        for(i=0; i<sample_size; i++){ 
          raw_percentiles.push(jstat.pnorm(input_data_sorted[i], input_mean, input_sd));
        }

        // debugger

        // var raw_percentiles = [0.009259259,0.014285714,0.014285714,0.016666667,0.016666667,0.017857143,0.018518519,0.027777778,0.028571429,0.028571429,0.028571429,0.033333333,0.033333333,0.035714286,0.0375,0.041666667,0.041666667,0.041666667,0.041666667,0.042857143,0.042857143,0.042857143,0.05,0.055555556,0.069444444,0.083333333,0.083333333,0.083333333,0.083333333,0.083333333,0.083333333,0.085714286,0.1,0.1,0.101851852,0.104166667,0.111111111,0.111111111,0.114285714,0.114285714,0.116666667,0.12037037,0.125,0.125,0.128571429,0.133333333,0.138888889,0.141666667,0.142857143,0.142857143,0.15,0.152777778,0.158333333,0.166666667,0.171428571,0.183333333,0.185714286,0.185714286,0.1875,0.190140845,0.194444444,0.2,0.204545455,0.208333333,0.214285714,0.214285714,0.253521127,0.271428571,0.277777778,0.291666667,0.3,0.3,0.307017544,0.324074074,0.328571429,0.333333333,0.333333333,0.342857143,0.357142857,0.358333333,0.378787879,0.381355932,0.395833333,0.4,0.414285714,0.414285714,0.414285714,0.414285714,0.43,0.433333333,0.4375,0.445833333,0.450704225,0.453333333,0.458333333,0.466666667,0.476666667,0.494736842,0.5,0.516666667,0.533333333,0.55,0.557142857,0.56884058,0.569444444,0.571428571,0.585714286,0.61,0.622222222,0.657407407,0.666666667,0.678947368,0.685714286,0.685714286,0.69047619,0.7,0.7,0.7,0.711538462,0.763888889,0.771428571,0.788888889,0.8,0.8,0.808333333,0.824712644,0.828571429,0.836842105,0.839285714,0.839285714,0.84,0.842857143,0.842857143,0.842857143,0.85,0.859649123,0.869791667,0.871428571,0.871428571,0.892344498,0.914285714,0.928571429,0.933908046,0.953703704,0.973684211,0.975,0.981481481,0.983333333,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.985714286,0.987096774,0.990740741,0.991666667,0.992,0.994047619,0.996666667,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
         
          var tm = mean(raw_percentiles),
              td = Math.sqrt(variance(raw_percentiles)),
              dd = [[0.10306430789206111, 0.0036139086950272735, 0.30498647327844536],[0.5924252668569606, 0.0462763685758622, 0.4340870312025223], [0.9847627827855167, 2.352350767874714e-4, 0.2609264955190324]];

          var g = vis.selectAll("g")
              .data([
              // {
              //   x: d3.range(n).map(Math.random),
              //   y: raw_percentiles,
              //   label: "Uniform Distribution"
              // }, 
              {
                x: d3.range(n).map(normal1(tm, td)),
                y: raw_percentiles,
                label: "Gaussian (Normal) Distribution"
              }
              // {
              //   x: d3.range(n).map(normal3(dd)),
              //   y: raw_percentiles,
              //   label: "Mixture of 3 Gaussians"
              // }
              ])
            .enter().append("g")
              .attr("class", "qq")
              .attr("transform", function(d, i) { return "translate(" + (width + margin.right + margin.left) * i + ")"; });
         
          g.append("rect")
              .attr("class", "box")
              .attr("width", width)
              .attr("height", height);
         
          g.call(chart);
         
          g.append("text")
              .attr("dy", "1.3em")
              .attr("dx", ".6em")
              .text(function(d) { return d.label; });
         
          chart.duration(1000);
         
          window.transition = function() {
            g.datum(randomize).call(chart);
          };

         
        function randomize(d) {
          d.y = d3.range(n).map(Math.random);
          return d;
        }
         
        // Sample from a normal distribution with mean 0, stddev 1.
        function normal() {
          var x = 0, y = 0, rds, c;
          do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            rds = x * x + y * y;
          } while (rds == 0 || rds > 1);
          c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
          return x * c; // throw away extra sample y * c
        }
         
        // Simple 1D Gaussian (normal) distribution
        function normal1(mean, deviation) {
          return function() {
            return mean + deviation * normal();
          };
        }
         
        // Gaussian Mixture Model (k=3) fit using E-M algorithm
        function normal3(dd) {
          return function() {
            var r = Math.random(),
                i = r < dd[0][2] ? 0 : r < dd[0][2] + dd[1][2] ? 1 : 2,
                d = dd[i];
            return d[0] + Math.sqrt(d[1]) * normal();
          }
        }
         
        // Welford's algorithm.
        function mean(x) {
          var n = x.length;
          if (n === 0) return NaN;
          var m = 0,
              i = -1;
          while (++i < n) m += (x[i] - m) / (i + 1);
          return m;
        }
         
        // Unbiased estimate of a sample's variance.
        // Also known as the sample variance, where the denominator is n - 1.
        function variance(x) {
          var n = x.length;
          if (n < 1) return NaN;
          if (n === 1) return 0;
          var m = mean(x),
              i = -1,
              s = 0;
          while (++i < n) {
            var v = x[i] - m;
            s += v * v;
          }
          return s / (n - 1);
        }
    }

      draw(input_data_num)

    $(".leaderboard").slideDown()

  })
})
