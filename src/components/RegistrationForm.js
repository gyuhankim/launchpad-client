import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {required, notEmpty, matches, length, isTrimmed} from '../validators';
import Input from './Input';

import '../styles/registration.css';

const passwordLength = length({
  min: 8,
  max: 32
})

const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  
  onSubmit(values) {
    const {username, password, firstName, lastName} = values;
    const user = {username: username.toLowerCase(), password, firstName, lastName};
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <p className="form-header">Register</p>
        <label htmlFor="firstname">First Name</label>
        <Field
          name="firstName"
          id="firstname"
          type="text"
          component={Input}
          validate={[required, notEmpty]}
        />

        <label htmlFor="lastname">Last Name</label>
        <Field
          name="lastName"
          id="lastname"
          type="text"
          component={Input}
          validate={[required, notEmpty]}
        />

        <label htmlFor="username">Username</label>
        <Field
          name="username"
          id="username"
          type="text"
          component={Input}
          validate={[required, notEmpty, isTrimmed]}
        />

        <label htmlFor="password">Password</label>
        <Field
          name="password"
          id="password"
          type="password"
          component={Input}
          validate={[required, passwordLength, isTrimmed]}
        />

        <label htmlFor="confirm-password-entry">Confirm Password</label>
        <Field
          name="confirm-password-entry"
          id="confirm-password-entry"
          type="password"
          component={Input}
          validate={[required, notEmpty, matchesPassword]}
        />

        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Submit
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);