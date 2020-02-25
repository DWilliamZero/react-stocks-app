import React from 'react';
import Axios from 'axios';
import Watchlist from './Watchlist.js';
import FindStock from './FindStock.js';
import DetailedContainer from './DetailedContainer.js';
import { Route } from 'react-router-dom';

const IEX_TOKEN = process.env.REACT_APP_IEX_TOKEN;

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      tickers: [],
      data: []
    }
  }

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = async () => {
    try {
      const stockData = []
      this.state.tickers.forEach(async ticker => {
        const stocks = await Axios.get(
          `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${IEX_TOKEN}`
        )
        stockData.push(stocks.data)
        //console.log(stockData)
        this.setState({
          data: stockData
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { tickers } = this.state
    if (tickers.length === 0 && !this.state.searchQuery.length) {
      alert('Need some cash')
    } else if (tickers.includes(this.state.searchQuery.toLowerCase())) {
      alert('Already Exists')
    } else {
      this.setState(
        state => ({
          tickers: [this.state.searchQuery.toLowerCase(), ...state.tickers],
          searchQuery: ''
        }),
        () => this.fetchStocks()
      )
    }
  }

  render() {
    return (
      <>
        <Route exact path='/'>
          <Watchlist stocks={this.state.data} />
          <FindStock
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            value={this.state.searchQuery}
            name="searchQuery"
          />
        </Route>
        <Route
          exact path="/details/:symbol"
          render={(props) => <DetailedContainer data={this.state.data} getData={this.fetchStocks} {...props} />}
        />
      </>
    );
  }
}

export default Container;