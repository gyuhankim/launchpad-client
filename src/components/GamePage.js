import React from 'react';
import {connect} from 'react-redux';
import {fetchOneGame, grabPlatform} from '../actions/games';

import Nav from './Nav';

import convertPlatformId from '../utils';

import '../styles/game-page.css';

export class Game extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchOneGame(this.props.match.params.game));
    // window.addEventListener('scroll', (e)=>console.log(e.target));
  }

  handlePlatformClick(platform) {
    this.props.dispatch(grabPlatform(platform))
    console.log(platform)
  }

  render() {
    let videos;
    let platforms;
    let summary;
    let releaseDate = new Date(this.props.currentGame.first_release_date);

    // Get readable release date
    if (releaseDate.getTime() === 1546214400000) {
      releaseDate = 2018;
    } else if (releaseDate.getTime() === 1577750400000) {
      releaseDate = 2019;
    } else {
      releaseDate = releaseDate.toDateString().replace(/^\S+\s/,'');
    }

    // Get platforms
    if (this.props.platforms) {
      platforms = this.props.platforms.map((platform, index) => {
        return (
          <button key={index} 
            className={convertPlatformId(platform)} 
            onClick={() => this.handlePlatformClick(convertPlatformId(platform))}
          >
          {convertPlatformId(platform)}
          </button>
        )
      })
    }

    // Get available videos
    if (this.props.videos) {
      videos = this.props.videos.map((video, index) => {
        if (video) {
  
          return (
            <div className="youtube-video" key={index}>
              <iframe title={this.props.currentGame.name} width="640" height="480" frameBorder="0" allowFullScreen="true"
              src={`https://www.youtube.com/embed/${video.video_id}`}
              />
            </div>
          )
        } else {
          return null;
        }
      })
    }

    // Get summary
    if (this.props.currentGame.summary) {
      summary = <summary className="game-page-summary">{this.props.currentGame.summary}</summary>
    } else {
      summary = <summary className="game-page-no-summary">Game description currently unavailable...</summary>
    }


    return (

      <main className="container" role="main">
        <Nav />
        <div className="game-page">
          
          {videos}   

          <div className="game-page-details">
            <div className="game-page-title">{this.props.currentGame.name}</div>
            <time className="game-page-release-date">{releaseDate}</time>
            <div className="game-page-platforms">{platforms}</div>
            {summary}
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  currentGame: state.games.currentGame,
  videos: state.games.currentGame.videos,
  platforms: state.games.currentGame.platforms
})

export default connect(mapStateToProps)(Game);