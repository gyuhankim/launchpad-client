import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import convertPlatformId from '../utils';

import {fetchGames} from '../actions/games';

import '../styles/game-grid.css';
import '../styles/card.css';

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
        boxArt = "https://res.cloudinary.com/teepublic/image/private/s--Ug0iCq1F--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1488911584/production/designs/1298385_1.jpg";
      }

      return (
        <div className="card" key={game.id}>

          <Link to={"/" + game.id}>
              <img className="card-image" src={boxArt} alt="game box art" />
          </Link>

            <div className="card-content">

              <Link to={"/" + game.id}>
                <div className="game-name">
                  {game.name}
                </div>
                <div className="game-release-date">
                  {releaseDate}
                </div>
              </Link>

              <div className="game-platforms">
                {convertPlatformId(game.platforms)}
                <span className="favorite-button">
                  <i className="fas fa-heart fa-2x" onClick={() => console.log('hello')}></i>
                </span>
              </div>  

            </div>
        </div>
      )

    })

    return (
      <div className="game-grid">
        {games}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  games: state.game.games,
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(GameList);