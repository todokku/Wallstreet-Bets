import React from 'react';
import { Link } from 'react-router-dom';
import StockIndexItemChart from './stock_index_item_chart';

class StockIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intradayData: []
    };
  }

  componentDidMount() {
    // debugger
    this.props.fetchStockIntradayData(this.props.stock.symbol)
  }

  renderShares() {
    if (this.props.orders[this.props.stock.symbol].shares) {
      return (
        <div className="stock-index-shares">
          {this.props.orders[this.props.stock.symbol].shares} shares
        </div>
      )
    }
  }

  render() {
    const { orders, stock, intradayData } = this.props;
    return (
      <Link to={`/stocks/${stock.symbol}`} className="stock-show-link" >
        <div className="stock-index">
          <div className="stock-index-left">
            <div className="stock-index-symbol">
              {stock.symbol}
            </div>
            {this.renderShares()}
          </div>
          <div className="stock-index-chart">
            <StockIndexItemChart
              intradayData={intradayData}
            />
          </div>
          <div className="stock-index-current-price">
            $162.43
          </div>
        </div>
      </Link>
    )
  }
}

export default StockIndexItem;