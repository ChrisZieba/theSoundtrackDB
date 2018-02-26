import React from 'react';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = () => (
  <div className="container-fluid">
    <header>
      <h1>TheSoundtrackDB</h1>
      <p>A place to find and listen to movie soundtracks.</p>
      <SearchBar />
    </header>
  </div>
);
 
export default Header;