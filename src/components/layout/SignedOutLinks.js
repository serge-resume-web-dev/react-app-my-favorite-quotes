import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Button, Dropdown, Divider } from 'react-materialize'

const SignedOutLinks = ({signInWithGoogle}) => {
  return (
    <div>
      <ul className="right">
        <li>
          <Dropdown trigger={<Button >Sign-In with Social Media</Button>}>
            <NavLink to="#" onClick={signInWithGoogle}>
              <i className="fab fa-google" style={{marginRight: "8px"}}></i>
              Sign in with Google
            </NavLink>
          <Divider/>
            <Button  tooltip="Still to come, but not yet"
              tooltipOptions={{position: 'right'}}
              style={{width: '100%', height: '100%'}}
            ><i className="fab fa-facebook-f" style={{marginRight: "8px"}}></i>
              Facebook
            </Button>
          <Divider/>
            <Button  tooltip="Still to come, but not yet"
              tooltipOptions={{position: 'right'}}
              style={{width: '100%', height: '100%'}}
            ><i className="fab fa-twitter" style={{marginRight: "8px"}}></i>
              Twitter
            </Button>
          </Dropdown>
        </li>
        <li>
          <NavLink to='/signup'>
          <i className="fas fa-user-plus"></i>&nbsp;
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink to='/signin'>
          <i className="fas fa-sign-in-alt"></i>&nbsp;
          Login
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

SignedOutLinks.propTypes = {
  signInWithGoogle: PropTypes.func,
}

export default SignedOutLinks