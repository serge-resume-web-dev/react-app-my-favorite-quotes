import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../firebaseConfig/firebaseConfig'

import { setUserInfo } from "../../store/actions/authActions"

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

import './Navbar.scss'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfoReset: false,
    }
  }

  userInfoReset = () => {
    this.setState({
      userInfoReset:true,
    });
  }

  componentDidUpdate(){
    if (this.props.user) {
      this.props.setUserInfo(this.props.user.displayName);
    }else if(!this.props.user && this.state.userInfoReset){
      this.props.setUserInfo(null);
    }
  }
  render() {
    const {isLoggedIn, user, signOut, signInWithGoogle} = this.props;
    
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <div className="row">
            <div className="col m3">
              <Link to='/' ><h4>MyFavQuotes</h4></Link>
            </div>

            <div className="col m9">
              {
                isLoggedIn
                ?<SignedInLinks signOut={signOut} user={user} userInfoReset = {this.userInfoReset}/>
                :<SignedOutLinks signInWithGoogle={signInWithGoogle}/>
              }
            </div>
          </div> 
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return{
    isLoggedIn: !!state.auth.token || state.auth.userInfo
  }
}

const mapDispatchToProps = dispatch => {
    return{
      setUserInfo: userInfo=>dispatch(setUserInfo(userInfo)),
    }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]), 
  user: PropTypes.object, //supplied by firebase.auth.GoogleAuthProvider() api
  signOut: PropTypes.func, //supplied by firebase.auth.GoogleAuthProvider() api
  signInWithGoogle: PropTypes.func,
  setUserInfo: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Navbar))