import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import convertPlatformId from '../utils';

import {fetchGames} from '../actions/games';

export class GameList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchGames());
  }

  render() {

    const games = this.props.games.map(game => {
      let boxArt;

      let releaseDate = new Date(game.first_release_date);

      if (releaseDate.getTime() === 1546214400000) {
        releaseDate = 2018;
      } else if (releaseDate.getTime() === 1577750400000) {
        releaseDate = 2019;
      } else {
        releaseDate = releaseDate.toDateString().replace(/^\S+\s/,'');
      }

      if (game.cover) {
        boxArt = game.cover.url;
      } else {
        boxArt = "http://infinitygene.net/images/black.jpg";
      }

      return (
        <div className="card" key={game.id}>
          <Link to={"/" + game.id}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={boxArt} alt="Game box art" />
              </figure>
            </div>
          </Link>
            <div className="card-content">
              <div className="media">
                <Link to={"/" + game.id}>
                  <div className="media-content">
                    <p className="title is-4">{game.name}</p>
                    <p className="subtitle is-6">{releaseDate}</p>
                  </div>
                </Link>
              </div>
              <div className="content">
                {convertPlatformId(game.platforms)}
                <br />
                <Link to={"/" + game.id}>Click Here</Link>
              </div>
            </div>
        </div>
      )

    })

    return (
      <div className="game-list">
        {games}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  games: state.game.games
})

export default connect(mapStateToProps)(GameList);