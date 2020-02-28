import React from 'react';

const FindStock = (props) => {
  return (
    <>
      <form name={props.list} id={props.name} className='form' onSubmit={props.onSubmit}>
        <input
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          type="text"
          placeholder='Enter Ticker Symbol'
        />
        <button className='add-stock-btn' type="submit">Add Stock</button>
      </form>
    </>
  )
}

export default FindStock;