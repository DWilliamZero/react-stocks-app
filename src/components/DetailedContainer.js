import React from 'react';
import DetailedQuote from './DetailedQuote';
import Chart from './Chart';
import CorporateData from './CorporateData'

const DetailedContainer = (props) => {
  return (
    <>
      <section className='detailed-top'>
        <DetailedQuote />
        <Chart />
      </section>
      <section className='detailed-bottom'>
        <CorporateData />
      </section>
    </>
  );
}

export default DetailedContainer;