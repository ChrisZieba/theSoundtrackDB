import React from 'react';
import '../styles/SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      count: 0,
      id: null,
      title: '',
      year: '',
      poster: {
        url: 'img/none.jpg',
        year: 'N/A'
      }
    };
  }

  render() {
    return(
      <div>
        <input className="search" type="text" autoComplete="off" placeholder="Start typing to search for movies" />
      </div>
    )
  }
}

export default SearchBar;