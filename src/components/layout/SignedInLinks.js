import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout, setUserInfo } from "../../store/actions/authActions"

import Profile from '../profile/Profile'

const SignedInLinks = ({user,userName, logout, signOut, userInfoReset} ) => {
  return (
    <ul className="right">
      <li>
        <NavLink to='/create'>
          <i className="fas fa-feather"></i>&nbsp;
          New Quote
        </NavLink>
      </li>
      <li>
        {
          user
          ?<NavLink to='/' onClick={()=>{signOut(); userInfoReset(); }}>
            <i className="fab fa-google"></i>
            &nbsp;Sign out
          </NavLink>
          :<NavLink to='/logout' onClick={()=>logout()}>
            <i className="fas fa-sign-out-alt"></i>&nbsp;
            Log Out
          </NavLink>
        }
      </li>
      <li>
        <NavLink to='/'>
          <Profile userName = {userName}/>
        </NavLink>
      </li>
    </ul>
  )
}

const mapStateToProps = (state) => {
  return{
    userName: state.auth.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    logout: () => dispatch(logout()),
    setUserInfo: userInfo => dispatch(setUserInfo(userInfo))
  }
}

SignedInLinks.propTypes = {
  user: PropTypes.object,
  userName: PropTypes.string,
  logout: PropTypes.func,
  signOut: PropTypes.func,
  setUserInfo: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)