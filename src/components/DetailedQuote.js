import React from 'react';

const DetailedQuote = (props) => {
  const switchPrice = Number(props.data.change) > 0 ? 'up' : 'down'
  return (
    <div className='stock-detail'>
      <h1>{props.data.companyName}</h1>
      <h3>Symbol:  <span>{props.data.symbol}</span></h3>
      <h3>Exchange:  <span>{props.data.primaryExchange}</span></h3>
      <h3>Last: <span className={`change ${switchPrice}`}>${props.data.latestPrice.toFixed(2)}</span></h3>
      <h3>52-Week High:  <span>${props.data.week52High.toFixed(2)}</span></h3>
      <h3>52-Week Low:  <span>${props.data.week52Low.toFixed(2)}</span></h3>
      <h3>Mrkt Cap:  <span>${(props.data.marketCap / 1000000000).toFixed(1)} Billion</span></h3>
    </div>
  );
}

export default DetailedQuote;