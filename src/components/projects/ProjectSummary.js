import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { deleteProject } from "../../store/actions/projectActions"

import Button from '../UI/Button/Button'

import './ProjectSummary.scss'

const ProjectSummary = ({ project, searchTitle, searchAuthor, isLoggedIn, deleteProject}) => {
  
  return (
    project.title.toLowerCase().includes(searchTitle.toLowerCase()) && project.author.toLowerCase().includes(searchAuthor.toLowerCase())
    ?<div className="summary card z-depth-0 project-summary">
      <Link to={"/project/" + project.id}>
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">
            {project.title}
          </span>
          <span className="card-title ">
            <small>
                <i>By: {project.author}</i>
            </small>
          </span>
          <p>Posted by {project.postedBy? project.postedBy : 'Unknown'}</p>
          <p className="grey-text">{project.date}</p>
        </div>
      </Link>
      <div>
        {
         isLoggedIn
          ? <Button onClick={() => deleteProject(project.id)} name="Delete" />
          : null
        }
      </div>
     </div>
     : null
  )
}

const mapStateToProps = (state) => {
  return{
    isLoggedIn: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch =>(
  {
    deleteProject: (id)=>{
      dispatch(deleteProject(id))
    }
  }
)

ProjectSummary.propTypes = {
  isLoggedIn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  project: PropTypes.object, 
  searchTitle: PropTypes.string, 
  searchAuthor: PropTypes.string,  
  deleteProject: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSummary)