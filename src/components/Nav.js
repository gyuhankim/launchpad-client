import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import '../styles/nav.css';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
    window.location.reload()
  }

  handleSearch(searchTerm) {
    console.log(searchTerm);
  }

  render() {

    if (this.props.loggedIn) {
      return (
        <div className="nav-bar">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>

          <Link to="/" onClick={() => this.logOut()} className="nav-link">
            Log Out
          </Link>

        </div>
      )
    }

    return (
      <div className="nav-bar">

        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/login" className="nav-link">
          Log In
        </Link>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  games: state.games.games
})

export default connect(mapStateToProps)(Nav);