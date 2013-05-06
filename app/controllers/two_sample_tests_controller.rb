class TwoSampleTestsController < ApplicationController

  def show
  end


  def compute    
    p params
    sample1 = params[:sample1]
    sample2 = params[:sample2]
    test_type = params[:test_type]
    equal_var = params[:equal_var]
    results = TwoSampleTest.new(sample1, sample2, test_type, equal_var)
    render :json => results
  end



end
