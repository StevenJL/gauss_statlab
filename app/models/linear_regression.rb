class LinearRegression

  def initialize(dataset)
    @dataset_paired = dataset
    @dataset = [[],[]]
    dataset.each do |key, value|
      @dataset[0] << value[0].to_f
      @dataset[1] << value[1].to_f
    end
  end

  def get_results
    output = {}
    sr = Statsample::Regression.simple(@dataset[0].to_scale, @dataset[1].to_scale)
    # [:a, :b, :r].each do |sym|
    #   output[sym] = sr.send(sym)
    # end
    output[:a] = sr.a
    output[:b] = sr.b
    output[:r] = sr.r
    output
  end

end