import React from 'react';
import {connect} from 'react-redux';
import {hideOnboarding} from '../actions/games';

import '../styles/onboarding.css';

export class Onboarding extends React.Component {

  handleButtonClick() {
    this.props.dispatch(hideOnboarding())    
  }

  render() {

    return (
      <div className={this.props.hideOnboarding ? "onboarding hide-onboarding" : "onboarding"}>
  
        <div className="onboarding-content">
  
          <div className="onboarding-title">
            LaunchPad
          </div>
  
          <div className="onboarding-description">
            YOUR MOST ANTICAPTED GAMES <br/>
            ALL IN ONE PLACE
          </div>
  
          <div className="onboarding-supplemental-content">
            Excited about a game release?<br />
            Hit the heart icon!
          </div>
  
          <button className="onboarding-button" onClick={() => this.handleButtonClick()}>
            Sounds good!
          </button>
  
        </div>
  
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hideOnboarding: state.games.hideOnboarding
})

export default connect(mapStateToProps)(Onboarding);