import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import GameList from './GameList';

export class LandingPage extends React.Component {

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {

    if (this.props.loggedIn) {
      return (
        <div className="home">
          <button onClick={() => this.logOut()}>Log Out</button>
          <GameList />
        </div>
      )
    }

    return (
      <div className="home">
        <Link to="/login">Log In</Link>
        <Link to="/register">Register</Link>
        <GameList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
