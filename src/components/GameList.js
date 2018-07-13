import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import convertPlatformId from '../utils';
import _ from 'underscore';

import Nav from './Nav';
import Toolbar from './Toolbar';
import Onboarding from './Onboarding';

import {fetchGames, fetchMoreGames, grabPlatform} from '../actions/games';
import {addFavorite, fetchFavorites, removeFavorite} from '../actions/favorites';

import '../styles/game-grid.css';
import '../styles/card.css';
import '../styles/consoles.css';

let pageCount = 1;

export class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.infiniteScroll = this.infiniteScroll.bind(this)
  }

  componentDidMount() {
    this.props.fetchGames();
    if (this.props.loggedIn) {
      this.props.fetchFavorites();
    }
    window.addEventListener('scroll', _.throttle(this.infiniteScroll, 1000));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.props.fetchFavorites();
    }
  }

  handleHeartClick(gameId) {
    let result = this.props.favorites.find(favorite => favorite._id === gameId);
    if (this.props.loggedIn && result) {
      this.props.removeFavorite(gameId);
    } else if (this.props.loggedIn && !result) {
      this.props.addFavorite(gameId);
    } else {
      window.location.replace("/login");
    }
  }

  handlePlatformClick(platform) {
    this.props.grabPlatform(platform)
    console.log(platform)
  }

  // readme and onboarding
  infiniteScroll() {
    let pageHeight = document.documentElement.offsetHeight;
    let windowHeight = window.innerHeight;
    let scrollPosition = window.scrollY || window.pageYOffset || (document.body.scrollTop + document.documentElement && document.documentElement.scrollTop) || 0;

    if (pageHeight <= windowHeight + scrollPosition) {
      pageCount++;
      this.props.fetchMoreGames(pageCount);
    }
  }

  render() {

    // Get list of favorites from currentUser
    let favorites = [];

    // Create a list of currentUser's favorites
    if (this.props.favorites) {
      this.props.favorites.map(favorite => favorites = [...favorites, favorite._id])
    }

    // Filter games by name
    let games = this.props.games.filter(game => game.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()))

    // Iterate through all games post-search
    games = games.map(game => {
      let boxArt;
      let platforms;
      let heartClass = favorites.includes(String(game._id)) ? 'favorited' : '';

      let releaseDate = new Date(game.first_release_date);

      // Convert to a readable release date
      if (releaseDate.getTime() === 1546214400000) {
        releaseDate = 2018;
      } else if (releaseDate.getTime() === 1577750400000) {
        releaseDate = 2019;
      } else {
        releaseDate = releaseDate.toDateString().replace(/^\S+\s/,'');
      }

      // Thumbnail => Can change image size/type directly in URL (t_cover_big)
      if (game.cover) {
        boxArt = `//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.cloudinary_id}`;
      } else {
        boxArt = "https://pbs.twimg.com/profile_images/648604381307371521/jxoa_qeC_400x400.png";
      }

      // Convert platforms from platform IDs
      if (game.platforms) {
        platforms = game.platforms.map((platform, index) => {
          if (convertPlatformId(platform) === null) {
            return undefined;
          }
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

      return (
        <div className="card" key={game.id}>

          <Link to={"/" + game.id}>
            <div className="card-image-container">
              <img className="card-image" src={boxArt} alt={`box art for ${game.name}`} />
            </div>
          </Link>

          <div className="card-menu">
            <i className={`favorite-button fas fa-heart fa-2x ${heartClass}`} onClick={() => this.handleHeartClick(game._id)}></i>
          </div>

          <div className="card-content">

            <Link to={"/" + game.id}>
              <div className="game-name">
                {game.name}
              </div>

              <time className="game-release-date">
                {releaseDate}
              </time>
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
            
        <Onboarding />

        <Nav />
        <Toolbar />

        <main className="game-grid-parent"
          onScroll={this.handleScroll}
          ref={(scroller) => {this.scroller = scroller}}
          role="main"
          aria-live="polite"
        >
          <div className="game-grid">
            {games}
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games.games,
  loggedIn: state.auth.currentUser !== null,
  favorites: state.favorites.favorites,
  searchTerm: state.games.searchTerm,
  pageCount: state.games.pageCount,
  platform: state.games.platform
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { fetchGames, fetchMoreGames, addFavorite, fetchFavorites, removeFavorite, grabPlatform }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);