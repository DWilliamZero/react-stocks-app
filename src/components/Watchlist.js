import React from 'react'
import { Link } from "react-router-dom";

const Watchlist = (props) =>
  props.stocks.map((stock, index) => {
    const switchPrice = Number(stock.change) > 0 ? 'up' : 'down'
    return (
      <Link to={`/details/${stock.symbol}`} className="card" key={index}>
        <h4 className="title">{stock.symbol}</h4>
        <div className="ticker">
          <p className="price">${stock.latestPrice.toFixed(2)}</p>
          <p className={`change ${switchPrice}`}>{stock.change.toFixed(2)}%</p>
        </div>
      </Link>
    )
  })

export default Watchlist;