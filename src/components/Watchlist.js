import React from 'react'
import { Link } from "react-router-dom";

const Watchlist = (props) =>
  props.stocks.map((stock, index) => {
    return (
      <Link to={`/${props.name}/${stock.symbol}`} className="card" key={index}>
        <div className='simple-quote'>
          <div className='top-row'>
            <h4 className="title">{stock.symbol}</h4>
            <h4 className="price">${stock.latestPrice.toFixed(2)}</h4>
          </div>
          <div className='bottom-row'>
            <h4 className="title">{stock.companyName}</h4>
            {stock.change > 0 ?
              <h4 className='green'>{stock.change.toFixed(2)}%</h4>
              :
              <h4 className='red'>{stock.change.toFixed(2)}%</h4>}
          </div>
        </div>
      </Link>
    )
  })

export default Watchlist;