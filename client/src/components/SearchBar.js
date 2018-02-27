import React from 'react';
import '../styles/SearchBar.css';
import SearchResults from './SearchResults';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  handleKeyPress(e) {
    const q = e.target.value;
    if (!q) {
      this.setState({ results: [] });
      return;
    }

    fetch(`http://localhost:3000/api/soundtrack/search?q=${q}`)
    .then(response => response.json()).then((results) => {
      if (!Array.isArray(results) || !results.length) return;
      this.setState({ results });
    })
    .catch(error => console.error('Error:', error));
  }

  clearResults(e) {
    //e.preventDefault();
    this.setState({ results: [] });
  }

  render() {
    return(
      <div>
        <input className="search" type="text" autoComplete="off" placeholder="Start typing to search for movies" onChange={this.handleKeyPress} />
        {this.state.results.length > 0 &&
          <div>
            <ul>
              {this.state.results.map((item, index) => (
                <Link onClick={this.clearResults} key={item.id} to={{ pathname: `/soundtrack/${item.id}` }}>
                  <li key={index}>{item.title}</li>
                </Link>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}

export default SearchBar;