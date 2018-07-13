import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import convertPlatformId from '../utils';

import Nav from './Nav';

import {fetchFavorites, removeFavorite} from '../actions/favorites';

import '../styles/game-grid.css';
import '../styles/card.css';

export class FavoritesList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchFavorites());
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn)
    this.props.dispatch(fetchFavorites());
  }

  handleHeartClick(gameId) {
    if (this.props.loggedIn) {
      this.props.dispatch(removeFavorite(gameId));
    } else {
      window.location.replace("/login");
    }
  }

  render() {

    if (!this.props.loggedIn) {
      return <Redirect to="/login" />
    }

    const favorites = this.props.favorites.map(favorite => {
      let boxArt;
      let platforms;

      let releaseDate = new Date(favorite.first_release_date);

      // Readable release date
      if (releaseDate.getTime() === 1546214400000) {
        releaseDate = 2018;
      } else if (releaseDate.getTime() === 1577750400000) {
        releaseDate = 2019;
      } else {
        releaseDate = releaseDate.toDateString().replace(/^\S+\s/,'');
      }

      // Thumbnail
      if (favorite.cover) {
        boxArt = `//images.igdb.com/igdb/image/upload/t_cover_big/${favorite.cover.cloudinary_id}`;
      } else {
        boxArt = "https://res.cloudinary.com/teepublic/image/private/s--Ug0iCq1F--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1488911584/production/designs/1298385_1.jpg";
      }

      // Convert platforms
      if (favorite.platforms) {
        platforms = favorite.platforms.map((platform, index) => {
          if (convertPlatformId(platform) === null) {
            return undefined;
          }
          return (
            <button key={index} className={convertPlatformId(platform)}>{convertPlatformId(platform)}</button>
          )
        })
      }

      return (
        <div className="card" key={favorite.id}>

          <Link to={"/" + favorite.id}>
            <div className="card-image-container">
              <img className="card-image" src={boxArt} alt="game box art" />
            </div>
          </Link>

            <div className="card-menu">
              <i className="favorite-button favorited fas fa-heart fa-2x" onClick={() => this.handleHeartClick(favorite._id)}></i>
            </div>

            <div className="card-content">

              <Link to={"/" + favorite.id}>
                <div className="game-name">
                  {favorite.name}
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
      <div className="container">
        <Nav />
        <div className="game-grid-parent-favorite">
          <div className="game-grid">
            {favorites}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites.favorites,
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(FavoritesList);