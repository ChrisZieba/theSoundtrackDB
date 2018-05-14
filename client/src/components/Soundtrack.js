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

  componentDidMount() {
    const { match: { params } } = this.props;
    this.update(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.update(nextProps.match.params);
    }
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

  update(params) {
    this.setState({
      songs: [],
      count: 0,
      id: null,
      title: '',
      year: '',
      poster: {
        url: 'img/none.jpg',
        year: 'N/A'
      }
    });
  }

  render() {
    return(
      <div className="container">
        <div className="alert alert-danger">
          <p>Unfortunaly, as of <strong>May 2018</strong> TheSoundtrackDB has shut down all services. Thank you to all the supporters over the last 6 years. <a href="https://github.com/chriszieba/thesoundtrackdb" target="_blank">The code is still on Github for anyone interested</a>.</p> 
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <div className="st-poster">
              <img src={this.state.poster.url} width="70" />
            </div>
          </div>

          <div className="col-md-auto">
            <div className="st-title">
              <h2>{this.state.title}</h2>
              <div className="st-title-year"><strong>Released:</strong> {this.state.poster.year}</div>
              <div className="st-title-count">{this.state.count} song(s)</div>
            </div>
          </div>
        </div>

        <div className="row st-song-list">
          {this.state.songs.map((song, index) => (
            <Song key={index} song={song} />
          ))}
        </div>
      </div>
    )
  }
}

export default Soundtrack;