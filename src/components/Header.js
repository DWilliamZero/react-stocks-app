import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link className='hero' to='/'>Killer Quotes</Link>
        <h2 className='sub-hero'>Real-Time Quotes Without the Hassle</h2>
      </nav>
    </header>
  );
}

export default Header;