import React from 'react';
import '../styles/Song.css';
import youtube from '../lib/youtube';

const play = ({ title, performed_by, written_by, by }) => {
  youtube.get(title, performed_by || written_by || by)
  .then((res) => {
    if (res.items && Array.isArray(res.items) && res.items.length > 0 && res.items[0].id && res.items[0].id.videoId) {
      youtube.play(res.items[0].id.videoId);
    }
  })
  .catch((error) => {
    console.log(error)
  });
};

const Song = ({ song }) => (
  <div className="col-md-4 offset-md-4 song">
    <div className="title"><div className="play" onClick={() => play(song)}>&#9654;</div> {song.title}</div>
    <div className="artist">{ song.performed_by || song.written_by || song.by }</div>
  </div>
)
 
export default Song;