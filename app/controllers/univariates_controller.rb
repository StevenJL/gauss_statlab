class UnivariatesController < ApplicationController

  def show
  end

  def compute
    input_data = params[:input_data]
    results = Univariate.new(input_data).get_basic_stats
    p results
    render :json => results
  end

end
