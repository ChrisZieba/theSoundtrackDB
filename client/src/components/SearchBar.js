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
    const q = e.target.value.trim();
    this.setState({ input: q });
    if (!q) {
      this.setState({ results: [] });
      return;
    }

    fetch(`https://lxg755w5y6.execute-api.us-east-1.amazonaws.com/prod/search?q=${q}`,{
      headers: {
        'x-api-key': 'GeyEvieaOj556R2FyyhWq2VpI0Viw2tl8rOQz0MK'
      }
    })
    .then(response => response.json()).then((results) => {
      if (!Array.isArray(results) || !results.length) return;
      this.setState({ results });
    })
    .catch(error => console.error('Error:', error));
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