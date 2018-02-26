import React from 'react';
import Song from './Song';
import '../styles/Soundtrack.css';

class Soundtrack extends React.Component {
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

  parseYear(query) {
    let year = '';
    const matches = query.match(/\((\d{4}.*?)\)/i);

    if (matches && matches.length > 0) {
      // strip out all non-numeric characters
      year = matches[0].replace(/[A-Za-z$-\(\)\{\}\[\]\\\/]/g, "");
    }

    return year;
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    fetch(`http://localhost:3000/api/soundtrack/${params.id}`)
    .then(response => response.json()).then((json) => {
      console.log(json)
      this.setState({
        songs: JSON.parse(json.songs),
        count: json.count,
        id: json.id,
        title: json.title.replace(/\((.*?)\)/gi, ""),
        year: this.parseYear(json.title)
      });

      return fetch(`http://api.themoviedb.org/3/search/movie?api_key=bec76ba6cb9f349afe8728693f6de4ba&query=${this.state.title}&year=&{this.state.year}`);
    })
    .then(response => response.json()).then((response) => {
      // now we have all our movies and can add them
      if (response.results && response.results.length > 0 && response.results[0].poster_path) {
        this.setState({
          poster: {
            url: `http://cf2.imgobject.com/t/p/w185${response.results[0].poster_path}`,
            year: response.results[0].release_date || 'N/A'
          }
        });
      }
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return(
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <div className="st-poster">
              <img src={this.state.poster.url} width="70" />
            </div>
          </div>

          <div className="col-md-auto">
            <div className="st-title">
              <h2>{this.state.title}</h2>
              <div className="st-title-year">Released: {this.state.poster.year}</div>
              <div className="st-title-count">{this.state.count} song(s)</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="st-song-list">
            {this.state.songs.map((song, index) => (
              <Song key={index} song={song} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Soundtrack;