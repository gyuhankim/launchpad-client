import React from 'react';
import {connect} from 'react-redux';

import {fetchGames} from '../actions/games';

export class GameList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchGames());
    
  }

  render() {
    console.log(this.props.games);

    const games = this.props.games.map(game => {

      const releaseDate = new Date(game.first_release_date);

      let thumbnail;

      if (game.cover) {
        thumbnail = game.cover.url;
      }

      return (
        <li className="game-entry" key={game.id}>
          <a href="/">
            <img src={thumbnail} className="game-entry-thumbnail" />
          </a>
          <p className="game-entry-name">{game.name}</p>
          <p className="game-entry-release-date">{releaseDate.toDateString().replace(/^\S+\s/,'')}</p>
        </li>
      )

    })

    return (
      <ul className="game-list">
        {games}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  games: state.game.games
})

export default connect(mapStateToProps)(GameList);