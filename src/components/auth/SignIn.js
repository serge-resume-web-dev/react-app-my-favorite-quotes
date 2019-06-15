import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"

import { auth } from "../../store/actions/authActions"

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.auth(this.state.email, this.state.password, null, true);
  }

  render() {

    return (
      !this.props.isLoggedIn
      ?<div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h6 className="red-text">
            {this.props.loginError
              ? `Oups, wrong email or password, try again. Error: ${this.props.loginError}`
              : null
            }
          </h6>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>
      :<Redirect to="/" />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, displayName, isLogin) => dispatch(auth(email, password, displayName, isLogin))
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.auth.authError,
    isLoggedIn: !!state.auth.token || state.auth.userInfo,
  }
}

SignIn.propTypes = {
  auth: PropTypes.func,
  loginError: PropTypes.string,
  isLoggedIn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)