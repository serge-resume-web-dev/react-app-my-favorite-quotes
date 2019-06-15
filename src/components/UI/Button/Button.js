import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({onClick, name}) => {
  return (
    <button className="btn pink lighten-1 z-depth-0" 
        type="button" onClick = {onClick}
    >
        {name}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
}

export default Button

