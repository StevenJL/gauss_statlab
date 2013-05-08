class TwoSampleTest


  def initialize(input_sample1, input_sample2, test_type, equal_var)
    input_sample1 = input_sample1.split(",")
    @input_sample1 = input_sample1.map {|int| int.to_f }
    input_sample2 = input_sample2.split(",")
    @input_sample2 = input_sample2.map {|int| int.to_f }
    @sample1 = @input_sample1.to_scale
    @sample2 = @input_sample2.to_scale
    @test_type = test_type
    @equal_var = equal_var
  end

  def convert_to_tails(test_type)
    if test_type == "Two Tail"
      :both
    elsif test_type = "Left Tail"
      :left
    else
      :right
    end
  end

  def get_results
    output = {}
    tst = Statsample::Test::T::TwoSamplesIndependent.new(@sample1,@sample2,{:tails=>convert_to_tails(@test_type)})
    if @equal_var == "Yes"
      output[:df] = tst.df_equal_variance
      output[:t] = tst.t_equal_variance
      output[:p] = tst.probability_equal_variance
    else
      output[:df] = tst.df_not_equal_variance
      output[:t] = tst.t_not_equal_variance
      output[:p] = tst.probability_not_equal_variance    
    end
    output[:n1] = @sample1.size
    output[:n2] = @sample2.size
    hist_two = histogram_two(@input_sample1, @input_sample2)
    output[:histogram1_values] = hist_two[0].values
    output[:histogram1_intervals] = hist_two[0].keys
    output[:histogram2_values] = hist_two[1].values
    output[:histogram2_intervals] = hist_two[1].keys
    output
  end

    # output[:histogram_values] = histogram(@input_data).values
    # output[:histogram_intervals] = histogram(@input_data).keys

  def histogram_two(input_data1, input_data2)
    n1 = input_data1.size
    n2 = input_data2.size
    output1 = {}
    output2 = {}
    bins1 = [input_data1.uniq.size, 30].min
    bins2 = [input_data2.uniq.size, 30].min
    min = [input_data1.min, input_data2.min].min
    max = [input_data1.max, input_data2.max].max
    range = max - min
    width1 = range / bins1.to_f
    width2 = range / bins2.to_f
    (bins1+1).times do |i|
      lower = min - (width1/2.0) + width1*i 
      upper = min + (width1/2.0) + width1*i
      freq1 = input_data1.count{|num| num >= lower && num < upper } / n1.to_f
      output1[ (lower + upper) / 2.0] = (freq1 * 200).round
    end
    (bins2+1).times do |i|
      lower = min - (width2/2.0) + width2*i 
      upper = min + (width2/2.0) + width2*i
      freq2 = input_data2.count{|num| num >= lower && num < upper } / n2.to_f
      output2[ (lower + upper) / 2.0] = (freq2 * 200).round
    end
    [output1, output2]
  end

end
