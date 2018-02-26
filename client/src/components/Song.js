import React from 'react';

const Song = ({ song }) => (
  <div className="song-list">
     <div>{song.title} by {song.by || song.performed_by || song.written_by}</div>
  </div>
)
 
export default Song;