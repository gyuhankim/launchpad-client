import React from 'react';
import {connect} from 'react-redux'
import {Route, withRouter, Switch} from 'react-router-dom';

import {refreshAuthToken} from '../actions/auth';

import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import GamePage from './GamePage';
import FavoritesList from './FavoritesList';
import Onboarding from './Onboarding';

export class App extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One Hour
    )
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return ;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    
    return (
    <div>
      
      <Onboarding />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/favorites" component={FavoritesList} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/:game" component={GamePage} />
      </Switch>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(App));