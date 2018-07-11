import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import convertPlatformId from '../utils';

import Nav from './Nav';
import Toolbar from './Toolbar';

import {fetchGames} from '../actions/games';
import {addFavorite, fetchFavorites} from '../actions/favorites';

import '../styles/game-grid.css';
import '../styles/card.css';

export class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  handleSearch(val) {
    this.setState({
      searchTerm: val
    })
  }

  componentDidMount() {
    this.props.dispatch(fetchGames());
    this.props.dispatch(fetchFavorites());
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.props.dispatch(fetchFavorites());
    }
  }

  handleHeartClick(gameId) {
    if (this.props.loggedIn) {
      this.props.dispatch(addFavorite(gameId));
    } else {
      window.location.replace("/login");
    }
  }

  handleScroll() {
    console.log('hi')
  }

  render() {

    // Get list of favorites from currentUser
    let favorites = [];

    if (this.props.favorites) {
      this.props.favorites.map(favorite => favorites = [...favorites, favorite._id])
    }

    const games = this.props.games.map(game => {
      let boxArt;
      let platforms;
      let heartClass = favorites.includes(String(game._id)) ? 'favorited' : '';

      let releaseDate = new Date(game.first_release_date);

      // Readable release date
      if (releaseDate.getTime() === 1546214400000) {
        releaseDate = 2018;
      } else if (releaseDate.getTime() === 1577750400000) {
        releaseDate = 2019;
      } else {
        releaseDate = releaseDate.toDateString().replace(/^\S+\s/,'');
      }

      // Thumbnail
      if (game.cover) {
        boxArt = `//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.cloudinary_id}`;
      } else {
        boxArt = "https://res.cloudinary.com/teepublic/image/private/s--Ug0iCq1F--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1488911584/production/designs/1298385_1.jpg";
      }

      // Convert platforms
      if (game.platforms) {
        platforms = game.platforms.map((platform, index) => {
          return (
            <span key={index}>{convertPlatformId(platform)} </span>
          )
        })
      }

      return (
        <div className="card" key={game.id}>

          <Link to={"/" + game.id}>
              <img className="card-image" src={boxArt} alt="game box art" />
          </Link>

          <div className="card-menu">
            <i className={`favorite-button fas fa-heart fa-2x ${heartClass}`} onClick={() => this.handleHeartClick(game._id)}></i>
          </div>

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
              {platforms}
            </div>  

          </div>

        </div>
      )
    })

    return (
      <div className="container" onScroll={() => this.handleScroll()}>
        <Nav />
        <Toolbar onChange={e => this.handleSearch(e.target.value)}/>

        <div className="game-grid-parent"
          onScroll={this.handleScroll}
          ref={(scroller) => {this.scroller = scroller}}
        >
          <div className="game-grid">
            {games}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  loggedIn: state.auth.currentUser !== null,
  favorites: state.favorites.favorites,
  searchTerm: state.games.searchTerm
})

export default connect(mapStateToProps)(GameList);