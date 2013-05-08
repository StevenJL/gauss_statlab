class LinearRegressionsController < ApplicationController

  def show
  end

  def compute
    dataset = params[:dataset]
    results = LinearRegression.new(dataset).get_results
    render :json => results
  end

end