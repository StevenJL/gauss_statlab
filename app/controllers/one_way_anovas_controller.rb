class OneWayAnovasController < ApplicationController

  def show
  end

  def compute
    p "incoming params to controller"
    p params
    data_sets_array = params[:data_sets_array]
    results = OneWayAnova.new(data_sets_array).get_results
    render :json => results
  end

end