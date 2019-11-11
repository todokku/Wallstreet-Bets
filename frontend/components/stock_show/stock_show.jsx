import React from 'react';
import { Link } from 'react-router-dom';
import NewsIndexItem from '../home/news/news_index_item';
import { fetchStockInfo } from '../../util/stock_api_util';

class StockShow extends React.Component {
  constructor(props) {
    super(props);;
  }

  componentDidMount() {
    this.props.fetchStockInfo(this.props.match.params.symbol);
    this.props.fetchStockNews(this.props.match.params.symbol);
    }

  // renderNews() {
  //   debugger
  //   if (this.props.stock.hasOwnProperty('articles')) {
  //     const stockNews = this.props.stock.news.articles;
  //     stockNews.map(singleNews => {
  //       return (
  //         <div className="news-index-item">
  //           <NewsIndexItem
  //             key={singleNews.id}
  //             url={singleNews.url}
  //             source={singleNews.source.name}
  //             title={singleNews.title}
  //             description={singleNews.description}
  //             image={singleNews.urlToImage}
  //           />
  //         </div>
  //       )
  //     })
  //   }
  // }

  render() {

    const {currentUser, stock, news } = this.props
    // if (stock.hasOwnProperty('news') && stock.hasOwnProperty('info')) {
      if (!stock) {
        return null;
      } else {
        return ( 
          <div className="stock-show-main">
            <div className="stock-show-container-1">
                <div className="stock-show-chart"></div>
                <div className="stock-info-container">
                  <div className="stock-info-header">About</div>
                  <div className="stock-info-description">
                    {stock.description}
                  </div>
                  <div className="stock-stats-container">
                    <div className="stock-stats-1">
                      <div>
                        <div>CEO</div>
                        <div>{stock.CEO}</div>
                      </div>
                      <div>
                        <div>Sector</div>  
                        <div>{stock.sector}</div>
                      </div>
                      <div>
                        <div>Industry</div>
                        <div>{stock.industry}</div>
                      </div>
                      <div>
                      <div>Exchange</div>
                      <div>{stock.exchange}</div>
                      </div>
                    </div> 
                    <div className="stock-stats-2">
                        <div>{stock.state}</div>
                        <div>{stock.city}</div>
                        <div>{stock.employees}</div>
                    </div>
                  </div>
                </div>
                <div className="stock-show-news-container">
                  <div className="index-title">
                    Recent News
                    </div>
                  {news.map(singleNews => {
                    return (
                      <div className="news-index-item">
                        <NewsIndexItem
                          key={singleNews.id}
                          url={singleNews.url}
                          source={singleNews.source.name}
                          title={singleNews.title}
                          description={singleNews.description}
                          image={singleNews.urlToImage}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            <div className="stock-show-container-2">
              <div className="stock-order-container">
                <div className="stock-order-form-container">
                  <div className="stock-title-order"></div>
                  <div className="stock-order-stats"></div>
                  <div className="stock-submit-button-container"></div>
                  <div className="buying-power"></div>
                </div>
                <div className="watch-submit-option"></div>
              </div>
            </div>
          </div>
        )
      }
  //   } else {
  //     return (
  //       <div>USER DOESN'T HAVE THE STOCKS AND NEWS IN THE STATE</div>
  //     )
  //   }  
  }
};

export default StockShow;