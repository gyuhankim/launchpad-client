import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import Input from './Input';
import {login} from '../actions/auth';

export class LoginForm extends React.Component {
  
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }


  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
            {this.props.error}
        </div>
      );
    }

    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {error}
        <label htmlFor="username">Username</label>
        <Field
          name="username"
          id="username-login"
          type="text"
          component={Input}
          validate={[required, notEmpty]}
        />

        <label htmlFor="password">Password</label>
        <Field
          name="password"
          id="password-login"
          type="password"
          component={Input}
          validate={[required, notEmpty]}
        />

        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Log In
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);