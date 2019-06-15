import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import { logout } from "../../store/actions/authActions"

class LogOut extends Component {
    componentDidMount(){
        this.props.logout()
    }
    render() {
        return (
         <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: ()=>dispatch(logout())
    }
}

LogOut.propTypes = {
    logout: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(LogOut)
