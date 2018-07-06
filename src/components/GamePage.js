import React from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class Game extends React.Component {

  componentDidMount() {
    // need to add a findById backend call here
  }

  render() {
    let currentGame = this.props.games.find(data => data.id == this.props.match.params.game);
    
    const videos = currentGame.videos.map((video, index) => {
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
      }
    })

    return (
      <div className="game-page">
        <Link to="/">Back</Link>
        {videos}
        <p className="game-summary">{currentGame.summary}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  games: state.game.games
})

export default connect(mapStateToProps)(Game);