import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class Nav extends React.Component {

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {

    if (this.props.loggedIn) {
      return (
        <div className="nav-bar">
          <Link to="/favorites">Favorites</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/favorites">Favorites</Link>
          <button onClick={() => this.logOut()}>Sign Out</button>
        </div>
      )
    }

    return (
      <div className="nav-bar">
        <Link to="/login">Favorites</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(Nav);