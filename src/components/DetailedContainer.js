import React from 'react';
import DetailedQuote from './DetailedQuote';
import Chart from './Chart';
import CorporateData from './CorporateData';
import { Link } from 'react-router-dom';

const DetailedContainer = (props) => {
  //console.log('props:', props);
  const { match: { params: { symbol } } } = props
  //console.log('symbol:', symbol);
  const result = props.data.find(element => {
    return (
      element.symbol === symbol
    )
  });
  //console.log('Result', result)

  return (
    <>
      <Link className='back' to='/'><h1>&#60; BACK</h1></Link>
      <section className='detailed'>
        <div className='quote-chart'>
          <DetailedQuote data={result} />
          <Chart data={result} />
        </div>
        <CorporateData data={result} />
      </section>
    </>
  );
}

export default DetailedContainer;