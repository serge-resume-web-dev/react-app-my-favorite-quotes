import React from 'react'
import PropTypes from 'prop-types'

const Input = ({label, type, name, onChange}) => {
  return (
    <div className="input-field">
        <label htmlFor={name}> {label} </label>
        <input type={type} id={name} name={name} onChange={onChange} />
    </div>
  )
}

Input.propTypes = {
    label: PropTypes.string, 
    type: PropTypes.string, 
    name: PropTypes.string, 
    onChange: PropTypes.func, 
}

export default Input