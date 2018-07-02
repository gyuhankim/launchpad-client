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
        return video.video_id;
      })

      return (
        <li className="game-entry" key={index}>
          <p className="game-entry-title">{game.name}</p>
          <p className="game-entry-release-date">{releaseDate.toDateString()}</p>
          <p className="game-entry-summary">{game.summary}</p>
          {/* <YouTube 
            videoId={videoId}
            opts={{            <--- REALLY LAGGY
              height: '390',
              width: '640'
            }}
          /> */}
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