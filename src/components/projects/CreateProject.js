import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {createProject, fetchProjects} from '../../store/actions/projectActions'

class CreateProject extends Component {
  state = {
    title: '',
    author: '',
    content: '',
    id: Date.now()*Math.random(),
    date: new Date().toDateString(),
    postedBy: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      postedBy: this.props.userName
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.setState({
      title: '',
      content: '',
      author: '',
    });
    fetchProjects();
  }

  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Quote</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} value={this.state.title}/>
            <label htmlFor="title">Quote Title</label>
          </div>
          <div className="input-field">
            <input type="text" id='author' onChange={this.handleChange} value={this.state.author}/>
            <label htmlFor="author">Quote Author</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} value={this.state.content} ></textarea>
            <label htmlFor="content">Quote Content</label>
          </div>
          <div className="input-field">
            <button type="submit" className="btn pink lighten-1">Publish</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    userName: state.auth.userInfo
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    createProject: (newProject)=> dispatch(createProject(newProject)),
    fetchProjects: () => dispatch(fetchProjects())
  }
}

CreateProject.propTypes = {
  userName: PropTypes.string,
  createProject: PropTypes.func,
  fetchProjects: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)