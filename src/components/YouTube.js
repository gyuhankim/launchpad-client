import React from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';

// Grabs the YouTube URL slug for each game
const videoId = game.videos.map(video => {
  if (video.video_id) {
    return (
      <YouTube 
        videoId={video.video_id}
        opts={
          {
            height:'240',
            width: '440'
          }
        }
      />
    )
  } else {
    return null;
  }
})