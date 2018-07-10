import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './LoginForm';

import '../styles/login.css';

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
    
      <LoginForm />

      <div className="break-line">
      </div>

      <div>
        <Link to="/register" className="login-page register-link">Register</Link>
      </div>

      <div className="login-page back-link">
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(LoginPage);