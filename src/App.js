import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { autoLogIn } from './store/actions/authActions'

import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import LogOut from './components/auth/LogOut'

import './sass/materialize.scss'

class App extends Component {
  componentDidMount(){
    //if we got any login details in out localStorage, so we shall auto login
    // to maintain our session
    this.props.autoLogIn();
  }
  render() {
    let routes = (
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/project/:id' component={ProjectDetails} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/project/:id' component={ProjectDetails} />
          <Route path='/create' component={CreateProject} />
          <Route path='/logout' component={LogOut} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar 
          />
          
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.token || state.auth.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    autoLogIn: () => dispatch(autoLogIn())
  }
}

App.propTypes = {
  autoLogIn: PropTypes.func,
  isLoggedIn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
}

export default connect(mapStateToProps, mapDispatchToProps)(App);