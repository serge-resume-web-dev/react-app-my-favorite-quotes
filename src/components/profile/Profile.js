import React from 'react'
import PropTypes from 'prop-types'

import './Profile.scss'

const Profile = ({ userName }) => {
    userName = userName || 'userName';
    let userNameArr = [];
    if (userName) {
        userNameArr = userName.split(' ');
    } else {
        userNameArr = localStorage.getItem('userName')
    }

    let userInitials = [];
    for (let i = 0; i < userNameArr.length; i++) {
        userInitials.push(userNameArr[i].charAt(0));
    }

    return (
        <div className="profile">
            <button className="btn btn-floating pink lighten-1">
                {userName ? userInitials.join('.') + '.' : 'NN'}
            </button>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{userName}</span>
                    <p>
                        I am a profile card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
                    </p>
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    userName: PropTypes.string,
}

export default Profile
