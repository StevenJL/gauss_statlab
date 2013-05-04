class Univariate

  def initialize(input_data)
    @input_data = input_data
  end

  def get_basic_stats
    output = {}
    input_data_array = @input_data.split(",")
    input_data_array = input_data_array.map {|int| int.to_f }
    vector = input_data_array.to_scale
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
    output
  end

end