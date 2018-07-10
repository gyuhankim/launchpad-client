import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './LoginForm';

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
    
      <LoginForm />

      <div>
        <Link to="/register">Sign Up</Link>
      </div>

      <Link to="/">Back</Link>
      
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(LoginPage);