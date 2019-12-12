import React from 'react';
import { Link } from 'react-router-dom';
import { parseFloatToDollars } from '../../util/numbers.util';
import { fetchStockPrice } from '../../util/stock_api_util';


class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'BUY',
      shares: '',
      price: this.props.price
    }
    this.setOrderType = this.setOrderType.bind(this);
    this.updateShares = this.updateShares.bind(this);
    this.setLatestPrice = this.setLatestPrice.bind(this);
    this.setOrderButtonStatus = this.setOrderButtonStatus.bind(this);
    this.handleResultModal = this.handleResultModal.bind(this);
    this.handleOrderTransaction = this.handleOrderTransaction.bind(this);
  }

  componentDidMount(){
    this.setLatestPrice();
    if (this.state.price === 0) {
      fetchStockPrice(this.props.stock.symbol).then(result => this.setState({
        price: result[this.props.stock.symbol].quote.latestPrice
      }))
    }
  }

  // componentWillReceiveProps(prevProps) {
  //   if (prevProps.match.params.symbol !== this.props.match.params.symbol) {
  //     window.location.reload(false);
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   debugger
  //   if (this.state.price === 0) {
  //     fetchStockPrice(this.props.stock.symbol).then(result => this.setState({
  //       price: result[this.props.stock.symbol].intradayData.quote.close
  //     }))
  //   }
  // }

  handleOrderTransaction(e) {
    e.preventDefault();
    const {stock, currentUser } = this.props;

    let order = {
      user_id: currentUser.id,
      symbol: stock.symbol,
      price: this.state.price,
      shares: this.state.shares,
      order_type: this.state.type
    }
    this.props.createOrder(order);
    this.props.openModal('order');
  }

  handleResultModal() {
    this.props.openModal('order');
  }

  setOrderType() {
    if (this.state.type === 'BUY') {
      this.setState( {type: 'SELL'} );
    } else if (this.state.type === 'SELL') {
      this.setState( {type: 'BUY'});
    };
  };

  setOrderButtonStatus(type) {
    let res = "order-button-type";
    if (this.state.type === type ) {
      res = `order-button-type-active`;
    }
    return res;
  }

  updateShares(e) {
    this.setState({
      shares: e.currentTarget.value
    });
  };

  setLatestPrice() {
    let newPrice = 0
    if (this.props.stock.intradayData) {
      newPrice = this.props.stock.intradayData[0].open;
    }
    this.setState({
      price: newPrice
    });
  }

  render() {
    return (
      <div className="stock-order-container">
        <div className="stock-order-form-container">
          <div className="stock-order-type"></div>
          <div className="stock-order-stats">
            <form onSubmit={this.handleOrderTransaction}>
              <div className="order-form-header">
                <div className={this.setOrderButtonStatus("BUY")} onClick={this.setOrderType}>ORDER BUY</div>
                <div className={this.setOrderButtonStatus("SELL")} onClick={this.setOrderType}>ORDER SELL</div>
              </div>
              <div className="order-form-row-1">
                <h3>Shares</h3>
                <input type="text" className="input-shares" value={this.state.shares} onChange={this.updateShares} placeholder="0"/>
              </div>
              <div className="order-form-row-2">
                <div className="order-form-market">
                  <h3>Market Price</h3>
                </div>
                <div className="order-form-price">
                  <div className="order-form-current-price">
                    {parseFloatToDollars(this.state.price)}
                  </div>
                </div>
              </div>
              <div className="order-form-row-3">
                <h3>Estimated Cost</h3>
                <div className="order-form-cost-4">
                  {parseFloatToDollars(this.state.shares * this.state.price)}
                </div>
              </div>
              <div className="order-form-row-5">
              </div>
              <div className="order-form-row-6">
                <input type="submit" className="order-form-submit"/> 
              </div>
            </form>
            <footer className="order-form-footer">
              <div className="buying-power">$14723.28 </div>
              <div className="available-buying-power">Buying Power Available</div>
            </footer>
          </div>
          <div className="stock-submit-button-container"></div>
        </div>
        <div className="watch-submit-option"></div>
        <div className="add-watchlist-button">Add To Watchlist</div>
      </div>
    )
  }
};

export default OrderForm;