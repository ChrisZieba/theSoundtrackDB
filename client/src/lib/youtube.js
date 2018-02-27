'use strict';

let player;

const youtube = {};
youtube.init = () => {
  // This code loads the IFrame Player API code asynchronously
  const tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Youtube api needs to use the global space
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player('media', {
      height: '240',
      width: '354',
      videoId: '',
      playerVars: { 
        'wmode': 'opaque',
        'rel': 0,
        'showinfo': 1,
        'controls': 2
      }
    });
  }
};

youtube.play = (id) => {
  if (!player) {
    return;
  }

  player.loadVideoById(id);
};

youtube.get = (title, artist) => {
  const endpoint = "https://www.googleapis.com/youtube/v3/search";
  const options = {
    type: "video",
    order: "relevance",
    videoCategoryId: "10",
    alt: "json",
    part: "id,snippet",
    key: "AIzaSyDA9zclpvT41AeFbsAaO5rVLZIx1yCFrvQ"
  };

  return new Promise((resolve, reject) => {
    let qs = Object.keys(options).map(opt => `${opt}=${options[opt]}`).join('&');
    let url = `${endpoint}?q=${artist}+${title}&${qs}`
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.response);
      }
    };
    xhr.onerror = () => reject(xhr.response);
    xhr.send();
  });
};

export default youtube;