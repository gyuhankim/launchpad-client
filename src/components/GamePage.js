import React from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchOneGame} from '../actions/games';

export class Game extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchOneGame(this.props.match.params.game));
  }

  render() {
    console.log(this.props.currentGame)
    let videos;

    if (this.props.videos) {
      videos = this.props.videos.map((video, index) => {
        if (video) {
  
          return (
            <div className="youtube-video" key={index}>
              <YouTube 
                videoId={video.video_id}
                opts={
                  {
                    height: '360',
                    width: '640'
                  }
                }
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
        <Link to="/">Back</Link>
        {videos}
        <p className="game-summary">{this.props.currentGame.summary}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentGame: state.game.currentGame,
  videos: state.game.currentGame.videos
})

export default connect(mapStateToProps)(Game);