import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <span>&copy; 2020 - </span><Link className='footer' to='/'>Killer Quotes</Link>
    </footer>
  );
}

export default Footer;