import * as React from 'react';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const correctPassword = 'password';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        email: '',
        password: ''
      },
      errors: {
        email: null,
        password: null
      }
    };
  }

  handleTypeEmail = e => {
    const email = e.target.value;
    this.setState(({ values }) => ({
      values: { ...values, email }
    }));
  };

  // each input has its own methods, rather than binding a shared method (eg 'handleType.bind(this, 'email)'),
  // in order to be performant, as the bind pattern generates a new function on each component re-render
  handleTypePassword = e => {
    const password = e.target.value;
    this.setState(({ values }) => ({
      values: { ...values, password }
    }));
  };

  clearError = field => {
    this.setState(({ errors }) => ({ errors: { ...errors, [field]: null } }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state.values;
    if (emailRegex.test(email)) {
      if (this.state.errors.email) this.clearError('email');
      if (password === correctPassword) {
        if (this.state.errors.password) this.clearError('password');
        this.props.onLogin(email);
      } else {
        this.setState(({ errors }) => ({
          errors: { ...errors, password: 'Incorrect password.' }
        }));
      }
    } else {
      this.setState(({ errors }) => ({
        errors: { ...errors, email: 'Not an email.' }
      }));
    }
  };

  handleFocusEmail = () => {
    this.clearError('email');
  };

  handleFocusPassword = () => {
    this.clearError('password');
  };

  render() {
    const { values, errors } = this.state;
    return (
      <div id="LoginPage">
        <form id="LoginForm" onSubmit={this.handleSubmit}>
          <label>Log in</label>
          <input
            autoFocus
            className={`${errors.email ? 'error' : ''}`}
            onChange={this.handleTypeEmail}
            onFocus={this.handleFocusEmail}
            placeholder="email"
            type="email"
            value={values.email}
          />
          {errors.email && <div className="errorMessage">{errors.email}</div>}
          <input
            className={`${errors.password ? 'error' : ''}`}
            onChange={this.handleTypePassword}
            onFocus={this.handleFocusPassword}
            placeholder="password"
            type="password"
            value={values.password}
          />
          {errors.password && (
            <div className="errorMessage">{errors.password}</div>
          )}
          <button type="submit" disabled={!values.email || !values.password}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
