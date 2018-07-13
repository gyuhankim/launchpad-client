import React from 'react';

import '../styles/onboarding.css';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideOnboarding: true
    }
  }

  handleButtonClick(e) {
    e.preventDefault();
    this.setState({
      hideOnboarding: true
    })
  }

  render() {



    return (
      <div className={this.state.hideOnboarding ? "onboarding hide-onboarding" : "onboarding"}>
  
        <div className="onboarding-content">
  
          <div className="onboarding-title">
            This Is A Great App
          </div>
  
          <div className="onboarding-description">
            Now this is a story all about how <br/>
            My life got flipped turned upside down <br/>
            And I'd like to take a minute, just sit right there <br/>
            I'll tell you how I became the prince of a town called Bel-Air <br/>
  
            In West Philadelphia born and raised <br/>
            On the playground is where I spent most of my days <br/>
            Chilling out, maxing, relaxing all cool <br/>
            And all shooting some b-ball outside of the school <br/>
            When a couple of guys who were up to no good <br/>
            Started making trouble in my neighborhood <br/>
            I got in one little fight and my mom got scared <br/>
            And said "You're moving with your auntie and uncle in Bel-Air" <br/>
          </div>
  
          <div className="onboarding-supplemental-content">
            {/* you can add additional stuff here */}
          </div>
  
          <div className="onboarding-supplemental-content">
            {/* you can add additional stuff here */}
          </div>
  
          <div className="onboarding-supplemental-content">
            {/* you can add additional stuff here */}
          </div>
  
          <button className="onboarding-button" onClick={e => this.handleButtonClick(e)}>
            OK, I'm Ready!
          </button>
  
        </div>
  
      </div>
    )
  }
}