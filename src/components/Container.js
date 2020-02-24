import React from 'react';
import Axios from 'axios';
import Watchlist from './Watchlist.js';
import DetailedContainer from './DetailedContainer.js';
//import { Route, Link, Switch } from 'react-router-dom';

const IEX_TOKEN = process.env.REACT_APP_IEX_TOKEN;

class Container extends React.Component {
  constructor() {
    super();
    // this.state({
    //   tickers: [],
    //   StockData: []
    // })
  }

  componentDidMount() {
    this.fetchStocks()
    this.fetchChartData()
  }

  fetchChartData = async () => {
    try {
      const stocks = await Axios.get(
        `https://cloud.iexapis.com/stable/stock/aapl/chart/1y?token=${IEX_TOKEN}`
      )
      console.log([stocks])
    } catch (error) {
      console.error(error)
    }
  }

  fetchStocks = async () => {
    try {
      const stocks = await Axios.get(
        `https://cloud.iexapis.com/stable/stock/aapl/quote?token=${IEX_TOKEN}`
      )
      console.log([stocks])
    } catch (error) {
      console.error(error)
    }
  }








  render() {
    return (
      <>
        <h1>This is the main page!</h1>
        <Watchlist />
        <DetailedContainer exact path='/detailed/:symbol' />
      </>
    );
  }
}

export default Container;