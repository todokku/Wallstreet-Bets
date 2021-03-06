class Api::PortfoliosController < ApplicationController
   def create
      @portfolio = Portfolio.new(portfolio_params)
      @portfolio.user_id = current_user.id
      if @portfolio.save
        render json: ['Saved balance!']
      else
        render json: @portfolio.errors.full_messages, status: 422
      end
    end

    def index
      # @portfolios = current_user.portfolios
      # render json: @portfolios
      @portfolios = Portfolio.all
    end

    private

    def portfolio_params
        params.require(:portfolio).permit(:date, :balance)
    end
end
