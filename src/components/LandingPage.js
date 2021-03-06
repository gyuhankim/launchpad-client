import React from 'react';
import {connect} from 'react-redux';

import GameList from './GameList';

export class LandingPage extends React.Component {

  render() {

    return (
      <div className="home">
        <GameList />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);