class Api::StocksController < ApplicationController
  def index
    # @stocks = current_user.stocks + current_user.watches
    @all_stocks = Stock.all
  end

  def show
    @stock = selected_stock
  end

  def selected_stock
    Stock.find(params[:symbol])
  end

  private

  def stocks_params
    params.require(:stock).permit(:name, :symbol)
  end 
end
