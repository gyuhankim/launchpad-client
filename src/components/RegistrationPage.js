import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

import '../styles/registration.css';

export function RegistrationPage(props) {

  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="registration-page">

      <RegistrationForm />

      <div className="break-line">
      </div>

      <div>
        <Link to="/login" className="login-link">Login</Link>
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

export default connect(mapStateToProps)(RegistrationPage);