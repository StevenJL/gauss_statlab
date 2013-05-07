class OneWayAnova

  def convert_to_float(array)
    output_array = []
    array.each {|num| output_array << num.to_f}
    output_array
  end

  def initialize(data_sets_array)
    @data_sets_array = []
    data_sets_array.each do |key, array|
      @data_sets_array << convert_to_float(array[0].split(','))
    end
  end

  def make_to_scale(array)
    output = []
    array.each do |element|
      output << element.to_scale
    end
    output
  end

  def get_min
    output = @data_sets_array.first.first
    @data_sets_array.each do |array|
      if array.min < output
        output = array.min
      end
    end
    output
  end

  def get_max
    output = @data_sets_array.first.first
    @data_sets_array.each do |array|
      if array.max > output
        output = array.max
      end
    end
    output
  end

  def get_results
    output = {}
    data_set_to_scale = make_to_scale(@data_sets_array)
    anova=Statsample::Anova::OneWayWithVectors.new(data_set_to_scale)
    output[:f] = anova.f
    output[:p] = anova.probability
    output[:sst] = anova.sst
    output[:data_sets_array] = @data_sets_array
    output[:min] = get_min
    output[:max] = get_max
    output
  end

end