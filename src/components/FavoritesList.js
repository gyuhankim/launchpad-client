import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import convertPlatformId from '../utils';

import {fetchFavorites} from '../actions/favorites';

import '../styles/game-grid.css';
import '../styles/card.css';

export class FavoritesList extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchFavorites());
  }

  render() {

    if (!this.props.loggedIn) {
      return <Redirect to="/login" />
    }

    const favorites = this.props.favorites.map(favorite => {
      let boxArt;

      let releaseDate = new Date(favorite.first_release_date);

      if (releaseDate.getTime() === 1546214400000) {
        releaseDate = 2018;
      } else if (releaseDate.getTime() === 1577750400000) {
        releaseDate = 2019;
      } else {
        releaseDate = releaseDate.toDateString().replace(/^\S+\s/,'');
      }

      if (favorite.cover) {
        boxArt = `//images.igdb.com/igdb/image/upload/t_cover_big/${favorite.cover.cloudinary_id}`;
      } else {
        boxArt = "https://res.cloudinary.com/teepublic/image/private/s--Ug0iCq1F--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1488911584/production/designs/1298385_1.jpg";
      }

      return (
        <div className="card" key={favorite.id}>

          <Link to={"/" + favorite.id}>
              <img className="card-image" src={boxArt} alt="game box art" />
          </Link>

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
                {convertPlatformId(favorite.platforms)}
                <span className="favorite-button">
                  <i className="fas fa-heart fa-2x" onClick={() => console.log(favorite._id)}></i>
                </span>
              </div>  

            </div>
        </div>
      )

    })

    return (
      <div className="game-grid">
        {favorites}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites.favorites,
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(FavoritesList);