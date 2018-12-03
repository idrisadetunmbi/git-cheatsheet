import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authAction, signOutUser } from '../store/actions/auth';
import { clearError } from '../store/actions/error';

const AuthStatus = ({ user, toggleFormVisibility, showMsg, signOut }) => ( // eslint-disable-line
  !user
    ? (
      <p style={{ padding: '0 2rem', display: `${showMsg ? 'block' : 'none'}` }}>
        You are currently not authenticated, click&nbsp;
        <a onClick={toggleFormVisibility} href="#!">here</a>
        &nbsp;to authenticate
      </p>)
    : (
      <p style={{ textAlign: 'center' }}>
        Signed in as&nbsp;
        <span style={{ fontWeight: 'bold' }}>{user.username}</span>
        <a style={{ display: 'block' }} onClick={signOut} href="#!">Sign Out</a>
      </p>
    )
);

const AccountStatusMsg = ({ authTypeIsSignIn, toggleAuthType }) => (
  authTypeIsSignIn
    ? (
      <p style={{ textAlign: 'center' }}>
        Don't have an account?&nbsp;
        <a onClick={toggleAuthType} href="#!">sign up</a>
      </p>)
    : (
      <p style={{ textAlign: 'center' }}>
        Have an account?&nbsp;
        <a onClick={toggleAuthType} href="#!">sign in</a>
      </p>
    )
);

export default connect(state => ({
  error: state.error,
  user: state.user,
}),
{ authAction, clearError, signOutUser })(class extends Component {
    state = {
      showForm: false,
      data: {
        username: '',
        password: '',
      },
      authTypeIsSignIn: true,
    }

    toggleFormVisibility = () => {
      this.setState(({ showForm }) => ({ showForm: !showForm }));
    }

    toggleAuthType = () => {
      this.setState(({ authTypeIsSignIn }) => ({ authTypeIsSignIn: !authTypeIsSignIn }));
    }

    onChange = (event) => {
      const { clearError: clearApiError } = this.props;
      const { name, value } = event.target;

      clearApiError();
      this.setState(({ data }) => ({
        data: {
          ...data,
          [name]: value,
        },
      }));
    }

    onSubmit = (event) => {
      event.preventDefault();
      const { authAction: authUser } = this.props;
      const { data, authTypeIsSignIn } = this.state;
      authUser(authTypeIsSignIn ? 'signin' : 'signup', data);
    }

    signOut = () => {
      this.props.signOutUser(); // eslint-disable-line
    };

    render() {
      const { showForm, data: { username, password }, authTypeIsSignIn } = this.state;
      const { error, user } = this.props;
      return (
        <div className="row">
          <img
            src="https://res.cloudinary.com/morerecipes/image/upload/v1543842002/Git-Icon-Black_l2jhkx.png"
            alt=""
            className="logo"
          />
          <AuthStatus
            toggleFormVisibility={this.toggleFormVisibility}
            showMsg={!showForm}
            user={user}
            signOut={this.signOut}
          />
          {
            showForm && !user
              ? (
                <div className="col s12">
                  <form onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                      <input
                        name="username"
                        required
                        id="username"
                        value={username}
                        type="text"
                        className="validate"
                        onChange={this.onChange}
                      />
                      <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        name="password"
                        id="password"
                        required
                        type="password"
                        value={password}
                        className="validate"
                        onChange={this.onChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="col s12">
                      <input
                        className="btn"
                        style={{ width: '100%' }}
                        type="submit"
                        value={authTypeIsSignIn ? 'sign in' : 'sign up'}
                      />
                    </div>
                  </form>
                  <AccountStatusMsg
                    authTypeIsSignIn={authTypeIsSignIn}
                    toggleAuthType={this.toggleAuthType}
                  />
                  <p className="red-text" style={{ textAlign: 'center' }}>{error}</p>
                </div>
              )
              : null
          }
        </div>
      );
    }
});
