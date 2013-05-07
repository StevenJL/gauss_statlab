class TwoSampleTestsController < ApplicationController

  def show
  end

  def compute    
    p "incoming params to controller"
    p params
    sample1 = params[:sample1]
    sample2 = params[:sample2]
    test_type = params[:test_type]
    equal_var = params[:equal_var]
    results = TwoSampleTest.new(sample1, sample2, test_type, equal_var).get_results
    p "results leaving controller"
    p results
    render :json => results
  end


end

