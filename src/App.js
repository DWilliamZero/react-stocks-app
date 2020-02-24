import React from 'react';
import Axios from 'axios';

function App() {


  const fetchStocks1 = async () => {
    try {
      const stocks = await Axios.get(
        `https://cloud.iexapis.com/stable/stock/aapl/chart/1y?token=sk_2829eadc8b754e7b8bd84fc647934978`
      )
      console.log([stocks])
    } catch (error) {
      console.error(error)
    }
  }

  const fetchStocks2 = async () => {
    try {
      const stocks = await Axios.get(
        `https://cloud.iexapis.com/stable/stock/aapl/quote?token=sk_2829eadc8b754e7b8bd84fc647934978`
      )
      console.log([stocks])
    } catch (error) {
      console.error(error)
    }
  }

  fetchStocks1()
  fetchStocks2()

  return (
    <div className="App">
      <h1>My Stock App</h1>
    </div>
  );
}

export default App;
