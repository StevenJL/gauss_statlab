class Univariate

  def initialize(input_data)
    @input_data = input_data
  end

  def get_basic_stats
    output = {}
    input_data_array = @input_data.split(",")
    vector = input_data_array.to_scale
    output[:n] = vector.size
    output[:mean] = vector.mean
    output[:median] = vector.median
    output[:s] = vector.sd
    output[:sigma] = vector.standard_deviation_population
    output[:variance_sam] = vector.variance
    output[:variance_pop] = vector.variance_population
    output[:ss] = vector.ss
    output[:kurtosis] = vector.kurtosis
  end

end