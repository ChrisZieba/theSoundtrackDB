import React from 'react';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="container-fluid">
    <header>
      <h1><Link to={{ pathname: `/` }}>TheSoundtrackDB</Link></h1>
      <p>A place to find and listen to movie soundtracks.</p>
      <SearchBar />
    </header>
  </div>
);
 
export default Header;