import React from 'react';

const FindStock = (props) => {
  return (
    <>
      <h2>Watchlist #1</h2>
      <form onSubmit={e => props.onSubmit(e)}>
        <input
          value={props.value}
          onChange={e => props.onChange(e)}
          name={props.name}
          type="text"
          placeholder='Enter Ticker Symbol'
        />
        <button type="submit">Add Stock</button>
      </form>
    </>
  )
}

export default FindStock;