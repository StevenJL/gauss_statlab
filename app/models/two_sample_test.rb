class TwoSampleTest


  def initialize(sample1, sample2, test_type, equal_var)
    @sample1 = sample1
    @sample2 = sample2
    @test_type = test_type
    @equal_var = equal_var
  end

  def get_results



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




end

