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
      searchQuery1: '',
      searchQuery2: '',
      searchQuery3: '',
      searchQuery4: '',
      searchQuery5: '',
      tickers1: [],
      tickers2: [],
      tickers3: [],
      tickers4: [],
      tickers5: [],
      tickers1Data: [],
      tickers2Data: [],
      tickers3Data: [],
      tickers4Data: [],
      tickers5Data: [],
      watchlists: []
    }
  }

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = async (listNum) => {
    try {
      const stockData = []
      this.state[listNum].forEach(async ticker => {
        const stocks = await Axios.get(
          `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${IEX_TOKEN}`
        )
        stockData.push(stocks.data)
        //console.log(stockData)
        this.setState({
          [`${listNum}Data`]: stockData
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = event => {
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const listNum = event.target.name
    const query = event.target.id

    if (this.state[listNum].length === 0 && !this.state[query].length) {
      alert('Please Enter A Ticker')
    } else if (this.state[listNum].includes(this.state[query].toLowerCase())) {
      alert('Symbol Already Exists')
    } else {
      this.setState(
        state => ({
          [listNum]: [this.state[query].toLowerCase(), ...this.state[listNum]],
          [query]: ''
        }),
        () => this.fetchStocks(listNum)
      )
    }
  }

  handleClick = () => {
    const newList = prompt("Please enter a watchlist name:", `New Watchlist ${this.state.watchlists.length + 1}`);
    if (newList === "") {
      alert('You did not enter a name!');
    } if (newList === null) {
      return
    } else {
      this.setState({
        watchlists: [...this.state.watchlists, newList]
      })
    }
  }


  render() {
    return (
      <>
        <Route exact path='/'>
          <div className='watchlist-grid'>
            {
              this.state.watchlists.length > 0 ?
                <div className='watchlist'>
                  <h1>{this.state.watchlists[0]}</h1>
                  <Watchlist name='watchlist-1' stocks={this.state.tickers1Data} />
                  <FindStock
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    value={this.state.searchQuery1}
                    name="searchQuery1"
                    list='tickers1'
                  />
                </div>
                : ''}
            {
              this.state.watchlists.length > 1 ?
                <div className='watchlist'>
                  <h1>{this.state.watchlists[1]}</h1>
                  <Watchlist name='watchlist-2' stocks={this.state.tickers2Data} />
                  <FindStock
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    value={this.state.searchQuery2}
                    name="searchQuery2"
                    list='tickers2'
                  />
                </div>
                : ''}
            {
              this.state.watchlists.length > 2 ?
                <div className='watchlist'>
                  <h1>{this.state.watchlists[2]}</h1>
                  <Watchlist name='watchlist-3' stocks={this.state.tickers3Data} />
                  <FindStock
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    value={this.state.searchQuery3}
                    name="searchQuery3"
                    list='tickers3'
                  />
                </div>
                : ''}
            {
              this.state.watchlists.length > 3 ?
                <div className='watchlist'>
                  <h1>{this.state.watchlists[3]}</h1>
                  <Watchlist name='watchlist-4' stocks={this.state.tickers4Data} />
                  <FindStock
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    value={this.state.searchQuery4}
                    name="searchQuery4"
                    list='tickers4'
                  />
                </div>
                : ''}
            {
              this.state.watchlists.length > 4 ?
                <div className='watchlist'>
                  <h1>{this.state.watchlists[4]}</h1>
                  <Watchlist name='watchlist-5' stocks={this.state.tickers5Data} />
                  <FindStock
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    value={this.state.searchQuery5}
                    name="searchQuery5"
                    list='tickers5'
                  />
                </div>
                : ''}
            {
              this.state.watchlists.length === 5 ?
                '' :
                <div className='add-watchlist tooltip' onClick={this.handleClick}>
                  <span className='tooltip-text'>Click To Create A Watchlist</span>
                  <h1>+</h1>
                </div>
            }
          </div>
        </Route>
        <Route
          exact path="/watchlist-1/:symbol"
          render={(props) => <DetailedContainer data={this.state.tickers1Data} getData={this.fetchStocks} {...props} />}
        />
        <Route
          exact path="/watchlist-2/:symbol"
          render={(props) => <DetailedContainer data={this.state.tickers2Data} getData={this.fetchStocks} {...props} />}
        />
        <Route
          exact path="/watchlist-3/:symbol"
          render={(props) => <DetailedContainer data={this.state.tickers3Data} getData={this.fetchStocks} {...props} />}
        />
        <Route
          exact path="/watchlist-4/:symbol"
          render={(props) => <DetailedContainer data={this.state.tickers4Data} getData={this.fetchStocks} {...props} />}
        />
        <Route
          exact path="/watchlist-5/:symbol"
          render={(props) => <DetailedContainer data={this.state.tickers5Data} getData={this.fetchStocks} {...props} />}
        />
      </>
    );
  }
}

export default Container;