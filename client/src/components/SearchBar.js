import React from 'react';
import '../styles/SearchBar.css';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: ''
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  handleKeyPress(e) {
    this.setState({ results: [] });
  }

  clearResults(e) {
    this.setState({ results: [], input: '' });
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="search-bar">
              <input className="search-input" type="text" autoComplete="off" placeholder="Start typing to search for movie or tv soundtracks..." onChange={this.handleKeyPress} value={this.state.input}/>
              {this.state.results.length > 0 &&
                <div className="search-results">
                  <ul>
                    {this.state.results.map((item, index) => (
                      <li key={index}>
                        <Link onClick={this.clearResults} key={item.id} to={{ pathname: `/soundtrack/${item.id}` }}>
                          {item.title} <span className="badge badge-secondary  badge-primary"> {item.count} song(s)</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;