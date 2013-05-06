class TwoSampleTest


  def initialize(input_sample1, input_sample2, test_type, equal_var)
    input_sample1 = input_sample1.split(",")
    input_sample1 = input_sample1.map {|int| int.to_f }
    input_sample2 = input_sample2.split(",")
    input_sample2 = input_sample2.map {|int| int.to_f }
    @sample1 = input_sample1.to_scale
    @sample2 = input_sample2.to_scale
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
    output
  end

end
