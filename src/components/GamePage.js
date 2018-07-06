import React from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchOneGame} from '../actions/games';
import convertPlatformId from '../utils';

import '../styles/game-page.css';

import Nav from './Nav';

export class Game extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchOneGame(this.props.match.params.game));
  }

  render() {
    let videos;
    let platforms;

    this.props.currentGame

    if (this.props.platforms) {
      platforms = this.props.platforms.map((platform, index) => {
        if (platform) {
          return (
            <span key={index}>{platform}</span>
          )
        }
      })
    }

    if (this.props.videos) {
      videos = this.props.videos.map((video, index) => {
        if (video) {
  
          return (
            <div className="youtube-video" key={index}>
              <iframe width="640" height="480" frameborder="0" allowFullscreen=""
              src={`https://www.youtube.com/embed/${video.video_id}`}
              />
            </div>
          )
        } else {
          return null;
        }
      })
    }

    return (
      <div className="game-page">
        <Nav />
        <Link to="/">Back</Link>
        {videos}
        <div className="game-page-details">
          <div className="game-page-title">{this.props.currentGame.name}</div>
          <div className="game-page-platforms">{platforms}</div>
          <div className="game-page-summary">{this.props.currentGame.summary}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentGame: state.game.currentGame,
  videos: state.game.currentGame.videos,
  platforms: state.game.currentGame.platforms
})

export default connect(mapStateToProps)(Game);