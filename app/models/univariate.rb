class Univariate

  def initialize(input_data)
    input_data_array = input_data.split(",")
    input_data_array = input_data_array.map {|int| int.to_f }
    @input_data = input_data_array
  end

  def get_basic_stats
    output = {}
    vector = @input_data.to_scale
    output[:n] = vector.size
    output[:min] = vector.min
    output[:first_quartile] = vector.percentil(25)
    output[:mean] = vector.mean
    output[:median] = vector.median
    output[:third_quartile] = vector.percentil(75)
    output[:max] =  vector.max
    output[:s] = vector.sd
    output[:sigma] = vector.standard_deviation_population
    output[:variance_sam] = vector.variance
    output[:variance_pop] = vector.variance_population
    output[:ss] = vector.ss
    output[:kurtosis] = vector.kurtosis
    output[:histogram_values] = histogram(@input_data).values
    output[:histogram_intervals] = histogram(@input_data).keys
    output
  end

  def histogram(input_data)
    n = input_data.size
    output = {}
    bins = [input_data.uniq.size, 12].min
    min = input_data.min
    max = input_data.max
    range = max - min
    width = range / bins.to_f
    (bins+1).times do |i|
      lower = min - (width/2.0) + width*i 
      upper = min + (width/2.0) + width*i
      freq = input_data.count{|num| num >= lower && num < upper } / n.to_f
      output[[lower, upper]] = (freq * 200).round
    end
    output
  end

end