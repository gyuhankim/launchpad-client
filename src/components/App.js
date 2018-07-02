import React from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {fetchGames} from '../actions/games';

export class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchGames());
  }

  render() {
    const games = this.props.games.map((game, index) => {

      const releaseDate = new Date(game.first_release_date);

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

      return (
        <li className="game-entry" key={index}>
          <p className="game-entry-title">{game.name}</p>
          <p className="game-entry-release-date">{releaseDate.toDateString()}</p>
          <p className="game-entry-summary">{game.summary}</p>
          {videoId}
        </li>
      )
    })

    return (
      <div className="games-list">
        <ul>
          {games}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  games: state.game.games
})

export default connect(mapStateToProps)(App);